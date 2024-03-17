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
 * Gets the eventReference of the Event with the given id.
 *
 * @param id the given Event id
 *
 * @returns the eventReference of the Event with the given id
 */
function getEventReferenceById(id) {
  let eventReference;
  getEvents().forEach((event) => {
    if (event.id === id) {
      eventReference = event.eventReference;
    }
  });

  return eventReference;
}

/**
 * Gets the Event's list of the associated Google Sheet.
 *
 * @returns the Event's list of the associated Google Sheet
 */
function getEvents() {
  const tableEvent = getEventTable();
  const eventFields = tableEvent.shift();

  const events = [];
  tableEvent.forEach((record) => {
    const event = {};
    eventFields.forEach((field, columnIndex) => {
      event[field] = record[columnIndex];
    });

    events.push(event);
  });

  return events;
}
