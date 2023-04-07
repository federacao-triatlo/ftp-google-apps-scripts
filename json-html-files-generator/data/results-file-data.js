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
 * Gets the results file list of the given event ID stored in the Google Sheets file with the given ID.
 *
 * @param dataBaseSheetId the ID of the Google Sheets file where the ResultsFiles table is stored
 * @param eventId the given event ID
 * @returns the list of results files of the given event
 */
function getResultsFilesByEventId(dataBaseSheetId, eventId) {
  const tableResultsFile = SpreadsheetApp.openById(dataBaseSheetId)
    .getRangeByName('TableResultsFile')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableResultsFileFields = tableResultsFile.shift();

  const resultsFiles = [];
  tableResultsFile.map((tableResultsFileRecord) => {
    if (tableResultsFileRecord[1] == eventId) {
      const resultsFile = {};
      tableResultsFileFields.map((key, columnIndex) => {
        resultsFile[key] = tableResultsFileRecord[columnIndex];
      });

      resultsFiles.push(resultsFile);
    }
  });

  return resultsFiles;
}
