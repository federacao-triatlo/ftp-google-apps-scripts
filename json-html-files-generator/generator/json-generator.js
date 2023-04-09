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
 * Creates a JSON string with the event's list stored in the Google Sheets file with the given ID.
 *
 * @param databaseSheetId the Google Sheets file ID where the Event table is stored
 * @returns the JSON string with the event's list stored in the Google Sheets file with the given ID
 */
function createEventsJsonByDatabaseSheetId(databaseSheetId) {
  return JSON.stringify(getEventsByDatabaseSheetId(databaseSheetId));
}

/**
 * Creates a JSON string with the event with the given event ID stored in the Google Sheets file with the given ID
 *
 * @param databaseSheetId the Google Sheets file ID where the Event table is stored
 * @param eventId the ID of the required event
 * @returns the JSON string with the required event
 */
function createEventJsonByEventId(databaseSheetId, eventId) {
  const event = getEventById(databaseSheetId, eventId);

  let eventRaces = [];
  event.programs.forEach((program) => {
    program.races.forEach((race) => {
      race.eventID = program.eventID;
      race.sport = program.sport;
      race.distanceType = program.distanceType;
      race.swimDistance = program.swimDistance;
      race.swimLaps = program.swimLaps;
      race.firstRunDistance = program.firstRunDistance;
      race.firstRunLaps = program.firstRunLaps;
      race.cyclingDistance = program.cyclingDistance;
      race.cyclingLaps = program.cyclingLaps;
      race.runDistance = program.runDistance;
      race.runLaps = program.runLaps;
      race.secondRunDistance = program.secondRunDistance;
      race.secondRunLaps = program.secondRunLaps;

      delete race.programID;
    });

    eventRaces = eventRaces.concat(program.races);
  });

  const uniqueEventRaces = [];
  const eventRacesIds = [];
  eventRaces.forEach((race) => {
    if (!eventRacesIds.includes(race.id)) {
      eventRacesIds.push(race.id);
      uniqueEventRaces.push(race);
    }
  });
  uniqueEventRaces.sort((raceA, raceB) => {
    return raceA.id - raceB.id;
  });

  delete event.programs;
  event.races = uniqueEventRaces;

  return JSON.stringify(event);
}
