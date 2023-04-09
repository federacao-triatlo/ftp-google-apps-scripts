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
 * Gets the results files stored in the Google Sheets file with the given ID
 *
 * @param databaseSheetId the Google Sheets file ID where the Race table is stored
 * @returns the list of results files stored in the Google Sheets file with the given ID
 */
function getresultsFilesByDatabaseSheetId(databaseSheetId) {
  const tableResultsFile = SpreadsheetApp.openById(databaseSheetId)
    .getRangeByName('TableResultsFile')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableResultsFileFields = tableResultsFile.shift();

  const resultsFiles = [];
  tableResultsFile.map((tableProgramRecord) => {
    const resultsFile = {};
    tableResultsFileFields.map((key, columnIndex) => {
      resultsFile[key] = tableProgramRecord[columnIndex];
    });

    resultsFiles.push(resultsFile);
  });

  return resultsFiles;
}

/**
 * Gets the results file list of the given event ID stored in the Google Sheets file with the given ID.
 *
 * @param databaseSheetId the ID of the Google Sheets file where the ResultsFiles table is stored
 * @param eventId the given event ID
 * @returns the list of results files of the given event
 */
function getResultsFilesByEventId(databaseSheetId, eventId) {
  const eventPrograms = getProgramsByEventId(databaseSheetId, eventId);
  const eventRacesIds = getRaceIdsFromPrograms(eventPrograms);

  return getResultsFilesByRaceIds(databaseSheetId, eventRacesIds);
}

/**
 * Gets the results files list of the given race IDs list stored in the Google Sheets file with the given ID.
 *
 * @param databaseSheetId the ID of the Google Sheets file where the ResultsFiles table is stored
 * @param raceIds the list of races
 * @returns the list of results files of the given races IDs
 */
function getResultsFilesByRaceIds(databaseSheetId, raceIds) {
  const seasonResultsFiles = getresultsFilesByDatabaseSheetId(databaseSheetId);

  return seasonResultsFiles.filter((file) => {
    return raceIds.includes(file.raceID);
  });
}
