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
 * Gets the event's ID specified on the "Definições" sheet of the associated Google Sheet.
 *
 * @returns the event's ID specified on the "Definições" sheet of the associated Google Sheet
 */
function getSelectedEventId() {
  return SpreadsheetApp.getActive().getRangeByName('ValueEventId').getDisplayValues()[0][0];
}

/**
 * Gets the tabular data stored on the "TableEvent" named range of the associated Google Sheet.
 *
 * @returns the tabular data stored on the "TableEvent" named range of the associated Google Sheet
 */
function getEventTable() {
  return SpreadsheetApp.getActive()
    .getRangeByName('TableEvent')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
}

/**
 * Gets the tabular data stored on the "TableFinishLineRecord" named range of the associated Google Sheet.
 *
 * @returns the tabular data stored on the "TableFinishLineRecord" named range of the associated Google Sheet
 */
function getFinishLineRecordTable() {
  return SpreadsheetApp.getActive()
    .getRangeByName('TableFinishLineRecord')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
}

/**
 * Gets the import date selected on the Google Definições "Main" tab.
 *
 * @returns the import date selected on the Google Definições "Main" tab
 */
function getSelectedImportDate() {
  return SpreadsheetApp.getActive().getRangeByName('ValueImportDate').getDisplayValues()[0][0];
}

/**
 * Gets the import status selected on the Google Sheets "Definições" tab.
 *
 * The import status defines of it is allowed to import data from the EnduranceTrio Timing Exporter
 * microservice. If the import status value is "PERMITIDO", it is allowed to import data. If the
 * import status value is "BLOQUEADO", it isn't allowed to import data from the EnduranceTrio Timing Exporter
 * microservice.
 *
 * @returns the import status selected on the Google Sheets "Definições" tab
 */
function getSelectedImportStatus() {
  return SpreadsheetApp.getActive().getRangeByName('ValueImportStatus').getDisplayValues()[0][0];
}
