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
 * Gets the Five Waypoints Track Data for the given date and writes in the proper range of the associated Google Sheet.
 *
 * @param importDate the given import date
 */
function writeFiveWaypointsTrackData(importDate) {
  const times = getFiveWaypointsTrackData(importDate);

  const numRows = times.length;
  const numCols = numRows == 0 ? 0 : times[0].length;

  if (numRows > 0 && numCols > 0) {
    const maxRows = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME_TIMING_EXPORTER_DATA_TARGET).getMaxRows();
    const maxColumns = SpreadsheetApp.getActive()
      .getSheetByName(SHEET_NAME_TIMING_EXPORTER_DATA_TARGET)
      .getMaxColumns();
    SpreadsheetApp.getActive()
      .getSheetByName(SHEET_NAME_TIMING_EXPORTER_DATA_TARGET)
      .getRange(3, 1, maxRows - 3, maxColumns)
      .clearContent();

    SpreadsheetApp.getActive()
      .getSheetByName(SHEET_NAME_TIMING_EXPORTER_DATA_TARGET)
      .getRange(3, 1, numRows, numCols)
      .setValues(times);
  }
}
