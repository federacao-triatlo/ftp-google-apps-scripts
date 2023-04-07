/*
 * MIT License
 *
 * Copyright(c) 2023 Ricardo do Canto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Creates a string with the HTML code to display the results files list of the Event that took place in the given year,
 * stored in the Google Sheets file with the given ID, that has the given event ID and the given event reference.
 *
 * @param eventYear the event's year
 * @param databaseSheetId the Google Sheets file ID where the Event table is stored
 * @param eventId the event's ID
 * @param eventReference the event's reference
 * @returns the string with the HTML code to display the results files list of the required Event
 */
function createEventFilesListHtml(eventYear, databaseSheetId, eventId, eventReference) {
  const resultsFiles = getResultsFilesByEventId(databaseSheetId, eventId);
  resultsFiles.sort((fileA, fileB) => {
    return fileA.displayOrder - fileB.displayOrder;
  });

  const fileBaseUrl = 'https://api-files.federacao-triatlo.pt/' + eventYear + '/events/' + eventReference + '/';

  let html = '<race-results event-reference="' + eventReference + '"></race-results>' + '\n';
  html = html + '<div class="results-files">' + '\n';
  html = html + '\t' + '<h2 class="results-files__header">Ficheiros</h2>' + '\n';

  resultsFiles.forEach((file) => {
    const linkTextPrefix =
      '" target="_blank" rel="noopener noreferrer"><span class="fa fa-file-pdf"></span><span class="results-files__title">';
    const linkTextSufix = '</span></a>';

    if (file.active == 'TRUE') {
      const hrefValue = fileBaseUrl + file.fileName;
      const linkText = file.title + ' - ' + file.subtitle;

      html = html + '\t' + '<div class="results-files__item">' + '\n';
      html = html + '\t\t' + '<a href="' + hrefValue + linkTextPrefix + linkText + linkTextSufix + '\n';
      html = html + '\t' + '</div>' + '\n';
    }
  });

  html = html + '</div>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}

/**
 * Creates a string with the HTML code to display the race results stored in the file with the given range name that
 * are stored in the Google Sheets file with the given ID.
 *
 * @param resultsSheetId the Google Sheets file ID where the results are stored
 * @param resultsRangeName the name of the range that contains the required results
 * @returns the string with the HTML code to display the required race results
 */
function createResultsTableHtml(resultsSheetId, resultsRangeName) {
  const results = getResultsByRangeName(resultsSheetId, resultsRangeName);

  let html = '<div class="table-container">' + '\n';
  html += '\t' + '<table class="table is-striped is-narrow is-hoverable table is-fullwidth">' + '\n';
  html += createTableHeadHtml(results);
  html += createTableBodyHtml(results);
  html += '\t' + '</table>' + '\n';
  html += '</div>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}

/**
 * Creates the HTML code of the table's head to display the given data.
 *
 * @param data the data to be displayed in the table
 * @returns the string with the HTML code of the table's head that displays the given data
 */
function createTableHeadHtml(data) {
  const resultsKeys = Object.keys(data[0]);
  const tableLabels = resultsKeys.filter((element) => {
    return element !== 'athleteID';
  });

  tableLabels.forEach((label, index, tableLabels) => {
    tableLabels[index] = getDisplayValue(label);
  });

  let html = '\t\t' + '<thead>' + '\n';
  html += '\t\t\t' + '<tr>' + '\n';

  tableLabels.forEach((label) => {
    html += '\t\t\t\t' + '<th>' + label + '</th>' + '\n';
  });

  html += '\t\t\t' + '</tr>' + '\n';
  html += '\t\t' + '</thead>' + '\n';

  return html;
}

/**
 * Creates the HTML code of the table's body to display the given data.
 *
 * @param data the data to be displayed in the table
 * @returns the string with the HTML code of the table's body that displays the given data
 */
function createTableBodyHtml(data) {
  let html = '\t\t' + '<tbody>' + '\n';

  data.forEach((row) => {
    html += '\t\t\t' + '<tr>' + '\n';

    for (key in row) {
      if (key !== 'athleteID') {
        html += '\t\t\t' + '<td>' + row[key] + '</td>' + '\n';
      }
    }

    html += '\t\t\t' + '</tr>' + '\n';
  });

  html += '\t\t' + '</tbody>' + '\n';

  return html;
}
