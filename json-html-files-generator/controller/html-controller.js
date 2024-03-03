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
 * Saves a file, in the user's Google Drive root folder, with the HTML code that lists all the results files
 * of the Event specified on the main sheet of the spreadsheet.
 */
function saveEventResultsFilesListHtmlFile() {
  const eventYear = SpreadsheetApp.getActive().getRangeByName('ValueEventYear').getDisplayValues()[0][0];
  const databaseSheetId = SpreadsheetApp.getActive().getRangeByName('ValueDataBaseSheetId').getDisplayValues()[0][0];
  const eventId = SpreadsheetApp.getActive().getRangeByName('ValueEventId').getDisplayValues()[0][0];
  const eventReference = SpreadsheetApp.getActive().getRangeByName('ValueEventReference').getDisplayValues()[0][0];

  const html = createEventFilesListHtml(eventYear, databaseSheetId, eventId, eventReference);
  const fileName = eventReference + '.html';

  DriveApp.createFile(fileName, html, MimeType.HTML);
}

/**
 * Saves a file, in the user's Google Drive root folder, with the HTML code that displays the race results
 * of the specified race reference, stored in the specified range name of the Google Sheets file with
 * the specified ID. The race reference, the range name and the Google Sheets file's id are specified on the main
 * sheet of the spreadsheet.
 */
function saveResultsTableHtmlFile() {
  const resultsSheetId = SpreadsheetApp.getActive().getRangeByName('ValueResultsSheetId').getDisplayValues()[0][0];
  const resultsRangeName = SpreadsheetApp.getActive().getRangeByName('ValueResultsRangeName').getDisplayValues()[0][0];
  const raceReference = SpreadsheetApp.getActive().getRangeByName('ValueRaceReference').getDisplayValues()[0][0];

  const html = createResultsTableHtml(resultsSheetId, resultsRangeName);
  const fileName = raceReference + '.html';

  DriveApp.createFile(fileName, html, MimeType.HTML);
}

/**
 * Saves a file, in the user's Google Drive root folder, with the HTML code that displays the live results of the
 * Event specified on the main sheet of the spreadsheet and using the data stored on TableLiveResults range.
 */
function saveLiveResultsHtmlFile() {
  const eventReference = SpreadsheetApp.getActive().getRangeByName('ValueEventReference').getDisplayValues()[0][0];

  const html = createLiveResultsHtml();
  const fileName = eventReference + '-LIVE.html';

  DriveApp.createFile(fileName, html, MimeType.HTML);
}

/**
 * Saves a file, in the user's Google Drive root folder, with the HTML code that lists the required files and links
 * on the EventON page of the Event specified on the main sheet of the spreadsheet.
 */
function saveEventOnResourcesListHtmlFile() {
  const eventYear = SpreadsheetApp.getActive().getRangeByName('ValueEventYear').getDisplayValues()[0][0];
  const databaseSheetId = SpreadsheetApp.getActive().getRangeByName('ValueDataBaseSheetId').getDisplayValues()[0][0];
  const eventId = SpreadsheetApp.getActive().getRangeByName('ValueEventId').getDisplayValues()[0][0];
  const eventReference = SpreadsheetApp.getActive().getRangeByName('ValueEventReference').getDisplayValues()[0][0];

  const html = createEventOnResourcesListHtml(eventYear, databaseSheetId, eventId, eventReference);
  const fileName = eventReference + '-EventON.html';

  DriveApp.createFile(fileName, html, MimeType.HTML);
}
