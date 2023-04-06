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
 * Creates and dave a file with the HTML code to display the results table
 */
function createResultsTableHtmlFile() {
  const resultsSheetId = SpreadsheetApp.getActive().getRangeByName('CellResultsSheetId').getDisplayValues()[0][0];
  const resultsRangeName = SpreadsheetApp.getActive().getRangeByName('CellResultsRangeName').getDisplayValues()[0][0];
  const raceReference = SpreadsheetApp.getActive().getRangeByName('CellRaceReference').getDisplayValues()[0][0];

  const results = getResultsByRangeName(resultsSheetId, resultsRangeName);

  const html = createResultsTableHtml(results);

  const fileName = raceReference + '.html';
  DriveApp.createFile(fileName, html.replace(/\t/gi, '\x20\x20'), MimeType.HTML);
}

/**
 * Gets the race results in the given resultsRangeName that are available
 * in the Google Sheets with the given id (resultsHeetId)
 *
 * @param resultsSheetId the Google Sheets ID where the race results are available
 * @param resultsRangeName the Google Sheets range name that contains the desired race results
 */
function getResultsByRangeName(resultsSheetId, resultsRangeName) {
  const tableResults = SpreadsheetApp.openById(resultsSheetId).getRangeByName(resultsRangeName).getDisplayValues();
  const resultsObjectKeys = tableResults.shift();

  const results = [];
  tableResults.map((row) => {
    if (row[0]) {
      const resultsRow = {};
      resultsObjectKeys.map((key, rowIndex) => {
        resultsRow[key] = row[rowIndex];
      });

      results.push(resultsRow);
    }
  });

  return results;
}

/**
 * Creates the HTML code of the table to display the given race results
 *
 * @param results the results of the race
 */
function createResultsTableHtml(results) {
  let html = '<div class="table-container">' + '\n';
  html += '\t' + '<table class="table is-striped is-narrow is-hoverable table is-fullwidth">' + '\n';
  html += createResultsTableHeadHtml(results[0]);
  html += createResultsTableBodyHtml(results);
  html += '\t' + '</table>' + '\n';
  html += '</div>' + '\n';

  return html;
}

/**
 * Creates the HTML code of the table's head to display the given race results
 *
 * @param firstResultsRow the first element of the race result's array
 */
function createResultsTableHeadHtml(firstResultsRow) {
  const resultsKeys = Object.keys(firstResultsRow);
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
 * Creates the HTML code of the table's body to display the given race results
 *
 * @param results the results of the race
 */
function createResultsTableBodyHtml(results) {
  let html = '\t\t' + '<tbody>' + '\n';

  results.forEach((row) => {
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
