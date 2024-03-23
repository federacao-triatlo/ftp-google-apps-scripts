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
 * Adds a custom menu to the Google Sheets file
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('FTP')
    .addItem('Importar MyLaps', 'validateGetTime')
    .addItem('Exportar T5', 'saveFinishLineTxt')
    .addToUi();
}

/**
 * Check if importing timing records is allowed and if there's an import date defined.
 *
 * If importing timing records is allowed and the import date is defined, the function writeFiveWaypointsTrackData(~)
 * will be called. If it isn't allowed, a message is displayed stating that importing timing records isn't possible.
 */
function validateGetTime() {
  const importStatus = getSelectedImportStatus();
  const importDate = getSelectedImportDate();

  if (importStatus === 'PERMITIDO') {
    if (importDate && importDate.length > 0) {
      writeFiveWaypointsTrackData(importDate);
    } else {
      const alertMessage =
        'Não está definida a data dos registo de tempo a importar!!\n' +
        'Para prosseguir com a importação de registos de tempo, é necessário definir a data dos mesmos.';

      SpreadsheetApp.getUi().alert(alertMessage);
    }
  } else {
    const alertMessage =
      'A importação de registos de tempo está bloqueada!\n' +
      'Para prosseguir com a importação de registos de tempo, é necessário alterar a respectiva definição.';

    SpreadsheetApp.getUi().alert(alertMessage);
  }
}
