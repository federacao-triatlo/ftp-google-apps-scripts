/**
 * Saves a file, in the user's Google Drive root folder with the HTML code that lists
 * all the results files of the Event specified on the main sheet of this spreadsheet.
 */
function createEventFilesListHtmlFile() {
  const dataBaseSheetId = SpreadsheetApp.getActive().getRangeByName('CellDataBaseSheetId').getDisplayValues()[0][0];
  const eventYear = SpreadsheetApp.getActive().getRangeByName('CellEventYear').getDisplayValues()[0][0];
  const eventId = SpreadsheetApp.getActive().getRangeByName('CellEventId').getDisplayValues()[0][0];
  const eventReference = SpreadsheetApp.getActive().getRangeByName('CellEventReference').getDisplayValues()[0][0];

  const resultsFiles = getResultsFilesByEventId(dataBaseSheetId, eventId);
  resultsFiles.sort((fileA, fileB) => {
    return fileA.displayOrder - fileB.displayOrder;
  });

  const html = createEventFilesListHtml(eventYear, eventReference, resultsFiles);

  const fileName = eventReference + '.html';
  DriveApp.createFile(fileName, html, MimeType.HTML);
}

/**
 * Gets the Results Files by Event ID.
 *
 * @param dataBaseSheetId the Google Sheet ID of the file of the event's database
 * @param eventId the event ID
 */
function getResultsFilesByEventId(dataBaseSheetId, eventId) {
  const tableResultsFile = SpreadsheetApp.openById(dataBaseSheetId)
    .getRangeByName('TableResultsFile')
    .getDisplayValues();
  const resultsFileObjectKeys = tableResultsFile.shift();

  const resultsFiles = [];
  tableResultsFile.map((row) => {
    if (row[0] && row[1] == eventId) {
      const resultsFileObject = {};
      resultsFileObjectKeys.map((key, rowIndex) => {
        resultsFileObject[key] = row[rowIndex];
      });

      resultsFiles.push(resultsFileObject);
    }
  });

  return resultsFiles;
}

/**
 * Creates the HTML code for the Event's files list
 *
 * @param eventYear the event's year
 * @param eventReference the event's reference
 * @param resultsFiles the results file list
 */
function createEventFilesListHtml(eventYear, eventReference, resultsFiles) {
  const fileBaseUrl = 'https://api-files.federacao-triatlo.pt/' + eventYear + '/events/' + eventReference + '/';

  let html = '<race-results event-reference="' + eventReference + '"></race-results>' + '\n';
  html = html + '<div class="results-files">' + '\n';
  html = html + '\x20\x20' + '<h2 class="results-files__header">Ficheiros</h2>' + '\n';

  resultsFiles.forEach((file) => {
    const linkTextPrefix =
      '" target="_blank" rel="noopener noreferrer"><span class="fa fa-file-pdf"></span><span class="results-files__title">';
    const linkTextSufix = '</span></a>';

    if (file.active == 'TRUE') {
      const hrefValue = fileBaseUrl + file.fileName;
      const linkText = file.title + ' - ' + file.subtitle;

      html = html + '\x20\x20' + '<div class="results-files__item">' + '\n';
      html = html + '\x20\x20\x20\x20' + '<a href="' + hrefValue + linkTextPrefix + linkText + linkTextSufix + '\n';
      html = html + '\x20\x20' + '</div>' + '\n';
    }
  });

  html = html + '</div>' + '\n';

  return html;
}
