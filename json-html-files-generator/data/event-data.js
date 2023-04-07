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
 * Gets the events list stored in the Google Sheets file with the given ID.
 *
 * @param databaseSheetId the Google Sheets file ID where the Event table is stored
 * @returns the list of events stored in the Google Sheets file with the given ID
 */
function getEventsByDatabaseSheetId(databaseSheetId) {
  const tableEvent = SpreadsheetApp.openById(databaseSheetId)
    .getRangeByName('TableEvent')
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
  const tableEventFields = tableEvent.shift();

  const returnedFields = ['id', 'eventReference', 'title', 'startDate', 'endDate', 'city', 'county', 'district'];

  const events = [];
  tableEvent.map((tableEventRecord) => {
    const event = {};
    tableEventFields.map((key, columnIndex) => {
      if (returnedFields.includes(key)) {
        event[key] = tableEventRecord[columnIndex];
      }
    });

    events.push(event);
  });

  return events;
}
