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
 * @fileOverview
 * This script contains functions that retrieve the values stored in named ranges
 * defined in the referenced Google Sheet.
 */

/**
 * Gets the year selected on the Google Sheets "Main" tab.
 *
 * @returns the year selected on the Google Sheets "Main" tab
 */
function getSelectedEventYear() {
  return SpreadsheetApp.getActive().getRangeByName('ValueEventYear').getDisplayValues()[0][0];
}

/**
 * Gets the event's database Google Sheet ID specified on the "Main" sheet of the associated Google Sheet.
 *
 * @returns the event's database Google Sheet ID specified on the "Main" sheet of the associated Google Sheet
 */
function getSelectedYearDatabaseGoogleSheetId() {
  return SpreadsheetApp.getActive().getRangeByName('ValueDataBaseSheetId').getDisplayValues()[0][0];
}

/**
 * Gets the event's ID specified on the "Main" sheet of the associated Google Sheet.
 *
 * @returns the event's ID specified on the "Main" sheet of the associated Google Sheet
 */
function getSelectedEventId() {
  return SpreadsheetApp.getActive().getRangeByName('ValueEventId').getDisplayValues()[0][0];
}

/**
 * Gets the event's reference specified on the "Main" sheet of the associated Google Sheet.
 *
 * @returns the event's reference specified on the "Main" sheet of the associated Google Sheet
 */
function getSelectedEventReference() {
  return SpreadsheetApp.getActive().getRangeByName('ValueEventReference').getDisplayValues()[0][0];
}

/**
 * Gets the race's reference specified on the "Main" sheet of the associated Google Sheet.
 *
 * @returns the race's reference specified on the "Main" sheet of the associated Google Sheet.
 */
function getSelectedRaceReference() {
  return SpreadsheetApp.getActive().getRangeByName('ValueRaceReference').getDisplayValues()[0][0];
}

/**
 * Gets the results Google Sheet ID of the race specified on the "Main" sheet of the associated Google Sheet.
 *
 * @returns the results Google Sheet ID of the race specified on the "Main" sheet of the associated Google Sheet
 */
function getSelectedResultsGoogleSheetId() {
  return SpreadsheetApp.getActive().getRangeByName('ValueResultsSheetId').getDisplayValues()[0][0];
}

/**
 * Gets the results range name of the race specified on the "Main" sheet of the associated Google Sheet.
 *
 * @returns the results range name of the race specified on the "Main" sheet of the associated Google Sheet
 */
function getSelectedRaceResultsRangeName() {
  return SpreadsheetApp.getActive().getRangeByName('ValueResultsSheetId').getDisplayValues()[0][0];
}

/**
 * Gets the tabular data stored on the "TableLiveResults" named range of the associated Google Sheet.
 *
 * @returns the tabular data stored on the "TableLiveResults" named range of the associated Google Sheet
 */
function getLiveRacesTable() {
  return SpreadsheetApp.getActive()
    .getRangeByName('TableLiveResults')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
}

/**
 * Gets the tabular data stored on the "TableEventOn" named range of the associated Google Sheet.
 *
 * @returns the tabular data stored on the "TableEventOn" named range of the associated Google Sheet
 */
function getEventOnTable() {
  return SpreadsheetApp.getActive()
    .getRangeByName('TableEventOn')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
}
