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
 * Creates a string with the HTML code to display, on the EventON page of the Event specified on the main sheet
 * of the spreadsheet, the required files.
 *
 * @param eventYear the event's year
 * @param databaseSheetId the Google Sheets file ID where the Event table is stored
 * @param eventId the event's ID
 * @param eventReference the event's reference
 *
 * @returns the string with the HTML code to display the results files list of the required Event
 */
function createEventOnResourcesListHtml(eventYear, databaseSheetId, eventId, eventReference) {
  const eventOnData = getEventEventOnData(eventYear, databaseSheetId, eventId, eventReference);

  let html = '<div class="documents-list">' + '\n';

  eventOnData.forEach((file) => {
    html += '\t' + '<div class="documents-list__item">' + '\n';
    html +=
      '\t\t' +
      '<a href="' +
      file.linkUrl +
      '" target="_blank" rel="noopener">' +
      getFontAwsomeIconHtmlCode(file.linkType) +
      '<span class="documents-list__title">' +
      file.linkLabel +
      '</span></a>' +
      '\n';
    html += '\t' + '</div>' + '\n';
  });

  html += '</div>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}

/**
 * Gets the HTML code to display the icon for the link of the given EventON resource
 *
 * @param linkType the given link type
 *
 * @returns the HTML code to display the icon for the link of the given EventON resource
 */
function getFontAwsomeIconHtmlCode(linkType) {
  let html = '';
  switch (linkType) {
    case 'GUIDE':
    case 'RULES':
    case 'COURSE_MAPS':
      html += '<span class="fa fa-file-pdf fa-2x"></span>';
      break;
    case 'TRACK':
      html += '<span class="fa fa-map fa-2x"></span>';
      break;
    case 'FORM':
      html += '<span class="fa fa-pencil-square-o fa-2x"></span>';
      break;
    case 'START_LIST':
      html += '<span class="fa fa-list fa-2x"></span>';
      break;
  }

  return html;
}
