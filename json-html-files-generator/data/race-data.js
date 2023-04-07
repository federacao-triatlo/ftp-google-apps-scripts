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
 * Gets the races stored in the Google Sheets file with the given ID
 *
 * @param databaseSheetId the Google Sheets file ID where the Race table is stored
 * @returns the list of races stored in the Google Sheets file with the given ID
 */
function getRacesByDatabaseSheetId(databaseSheetId) {
  const tableRace = SpreadsheetApp.openById(databaseSheetId)
    .getRangeByName('TableRace')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableRaceFields = tableRace.shift();

  const hiddenFields = [
    'resultsRangeName',
    'championships',
    'technicalDelegate',
    'headReferee',
    'competitionJury',
    'results',
  ];

  const races = [];
  tableRace.map((tableProgramRecord) => {
    const race = {};
    tableRaceFields.map((key, columnIndex) => {
      if (!hiddenFields.includes(key)) {
        race[key] = tableProgramRecord[columnIndex];
      }
    });

    races.push(race);
  });

  return races;
}

/**
 * Filters the races from the given races list that have the given program ID
 *
 * @param races thegivel races list to be filtered
 * @param programId the programa ID of the requeired races
 * @returns rhe list of races in the given list qith the given program ID
 */
function getRacesByProgramId(races, programId) {
  return races.filter((race) => {
    return race.programID == programId;
  });
}
