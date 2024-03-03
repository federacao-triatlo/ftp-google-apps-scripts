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
 * Creates the HTML code to display the live results tabs.
 *
 * @param tableLiveResults the given live results tabular data
 *
 * @returns the HTML code to display the live results tabs
 */
function createLiveResultsHtml(tableLiveResults) {
  const liveRaces = getLiveRaces(tableLiveResults);
  const iFrames = getIframes();

  let html = '<h2>Resultados Provisórios</h2>' + '\n';
  html += '<span class="tag is-warning is-medium">Fase Experimental</span>' + '\n';
  html +=
    '<p>Os resultados abaixo apresentados são provisórios e serão actualizados à medida que forem sendo processados na linha de meta. A solução para a disponibilização destes resultados está ainda em fase de testes.</p>';
  html += '<span class="tag is-info">Actualizar a página para obter mais resultados</span>' + '\n';
  html += '<div class="tabs is-toggle is-small is-fullwidth">' + '\n';

  html += '\t' + '<ul class="tabs-menu" style="margin-left: 0;">' + '\n';
  liveRaces.forEach((liveRace, index) => {
    if (index === 0) {
      html +=
        '\t\t' +
        '<li data-target="' +
        iFrames[index].id +
        '" class="is-active"><a>' +
        liveRace.label +
        '</a></li>' +
        '\n';
    } else {
      html += '\t\t' + '<li data-target="' + iFrames[index].id + '"><a>' + liveRace.label + '</a></li>' + '\n';
    }
  });
  html += '\t' + '</ul>' + '\n';
  html += '</div>' + '\n';

  html += '<div>' + '\n';
  liveRaces.forEach((liveRace, index) => {
    html += '\t' + '<!-- ' + iFrames[index].id.toUpperCase() + ' -->' + '\n';
    html += '\t' + '<section id="' + iFrames[index].id + '" class="tab-content">' + '\n';
    html += '\t\t' + '<h3>' + liveRace.title + '</h3>' + '\n';
    html += '\t\t' + '<iframe height="400px" width="100%" src="' + iFrames[index].url + '"></iframe>' + '\n';
    html += '\t' + '</section>' + '\n';
  });
  html += '</div>' + '\n';

  html += getBulmaTabsScript();

  return html.replace(/\t/gi, '\x20\x20');
}

/**
 * Defines the iFrames data
 *
 * @returns the iFrames data
 */
function getIframes() {
  const iFrame01 = {};
  iFrame01.id = 'live001';
  iFrame01.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLWbSUCJwfk5FJnaiRW-P8DyDHd67yMQWtHSnVInxpIPAic2DffWjGcuvIlBEiXtGROPRA7EHIgGJj/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame02 = {};
  iFrame02.id = 'live002';
  iFrame02.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRps95Gf7EITh58n6j7_4wzn0lG9_ftZVnjqxiJD-r4yXODJrQtJXUiktC5nyQrHjVwofdAVYEvnxp5/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame03 = {};
  iFrame03.id = 'live003';
  iFrame03.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRnxe22IG0Ly5HPvrha3Qcd5IwfY3aRV0FpjTURG9Du86ZFEp7kvF7DSpaeT54KSbqHtSsJ2yrje6yn/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame04 = {};
  iFrame04.id = 'live004';
  iFrame04.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTJ8v0MyQh2PmYFEPQX5GTWpHWMQZDleBEz9Ut4_VVbzawpKaBgKSIRWj0trIlT4C9Pgz_KlkXBOSB/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame05 = {};
  iFrame05.id = 'live005';
  iFrame05.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSopCQmuxmgVE2X4HzvWYLL0itu3GHqSJee-pjT7o6BAQ2Wcd3vBeKpJjJjHA0x6hyerfgd8gBHhj93/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame06 = {};
  iFrame06.id = 'live006';
  iFrame06.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYxOcKTsj1YKZzIg8RjvOmqBly9N9W3DJWNc-piLLknLEQXYaIuApPgj3A5yIHhHC_Vm8xL4ItKTtX/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame07 = {};
  iFrame07.id = 'live007';
  iFrame07.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0Owwbb8VIOgzTFhQvvCqW7sHYECU9SDdbRuS1K_wAyI_MwUJU0ifFpI7bhKddu6eGpTRpMf5yPSqQ/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame08 = {};
  iFrame08.id = 'live008';
  iFrame08.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcU69xzKdaKTJtPCfKFRhV6Ly83Ui_2TfE7u79gb0YmH-Cg0z_9TYU9sioDTlihozNJ48MY9bHJ9kQ/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame09 = {};
  iFrame09.id = 'live009';
  iFrame09.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2nIe1WMZ_71jZRrE1spLpBZXP5n84j0TCrVHFXftCzUBOwZDXwsxx5Qf9w5uLJpDmS9VGXpBPTIZo/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame10 = {};
  iFrame10.id = 'live010';
  iFrame10.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3o8CYdKFQbkEYoH7eaizy8pW0CbRVxFDsPqG0vzVCMjJEELpWP5mS3MgdvQzfyEFRqfjsC_R5Ibee/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame11 = {};
  iFrame11.id = 'live011';
  iFrame11.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvQ5l77TwBNZ4ll54X9ronabvnvlhQr1DPBb3pUBOGT4DnX7a-vRNXH9c0HFbSxm_fDwyxnZ1xYRO2/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame12 = {};
  iFrame12.id = 'live012';
  iFrame12.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmE0O2FqMZlU4YsBfdDtesjlkeMfvUSSbL6-buM8v5rhq8ww2OVrIFFtonbWcGzGtMmMs47aMLrisg/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame13 = {};
  iFrame13.id = 'live013';
  iFrame13.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ_2xxZHTOvVduSrZi4FWEps6jpBHQKblBxKFYfnLOZuDeLgptb3yKu6i1An5zkntD4S58OFoOv13Z/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame14 = {};
  iFrame14.id = 'live014';
  iFrame14.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSn_1RPKENP-JNUHcBxx7jA5YmPY533jL87cnYmVU0epocTE52MWydI8L9aIRLe8lApbLYHXMbdVTUg/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame15 = {};
  iFrame15.id = 'live015';
  iFrame15.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGm4c9YZj3kiLduygQJ5GWT6d98uFOdCFHMmGqyZmgvo3oWaPEhb8CDOoRYH35yi9Lu_B9o1gNdwWD/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame16 = {};
  iFrame16.id = 'live016';
  iFrame16.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKcLkSqoOGvF2YST0MwYk2SJgnUKWiNMpKYCrlzcVrrqd58e9vElXuLEfeNGExSD5H6RLQ9ZZbvjg7/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame17 = {};
  iFrame17.id = 'live017';
  iFrame17.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSySjmI0iSoFfebj1dH4bX_sbEqQZYpJ-HAuO3WYc6xoq0otvDRfdXOlMfcU5Pa_MznRFdtDJqGDuEW/pubhtml?widget=false&amp;headers=false&amp;chrome=false';
  const iFrame18 = {};
  iFrame18.id = 'live018';
  iFrame18.url =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyBYSDMiiEg6z7AGkn2_rTl3tkmtwgXF9bDHXBnq0QjoSKYt7_K-rhkkqUxk0tmqyYTTWie7DpexcJ/pubhtml?widget=false&amp;headers=false&amp;chrome=false';

  const iFrames = [];
  iFrames.push(iFrame01);
  iFrames.push(iFrame02);
  iFrames.push(iFrame03);
  iFrames.push(iFrame04);
  iFrames.push(iFrame05);
  iFrames.push(iFrame06);
  iFrames.push(iFrame07);
  iFrames.push(iFrame08);
  iFrames.push(iFrame09);
  iFrames.push(iFrame10);
  iFrames.push(iFrame11);
  iFrames.push(iFrame12);
  iFrames.push(iFrame13);
  iFrames.push(iFrame14);
  iFrames.push(iFrame15);
  iFrames.push(iFrame16);
  iFrames.push(iFrame17);
  iFrames.push(iFrame18);

  return iFrames;
}

/**
 * Generate the bulma tabs javascript code.
 *
 * @returns the bulma tabs javascript code
 */
function getBulmaTabsScript() {
  let html = '<script>' + '\n';
  html += '\t' + 'const tabSystem = {' + '\n';
  html += '\t\t' + 'init() {' + '\n';
  html += '\t\t\t' + "document.querySelectorAll('.tabs-menu').forEach(tabMenu => {" + '\n';
  html += '\t\t\t\t' + 'Array.from(tabMenu.children).forEach((child) => {' + '\n';
  html += '\t\t\t\t\t' + "child.addEventListener('click', () => {" + '\n';
  html += '\t\t\t\t\t\t' + 'tabSystem.toggle(child.dataset.target);' + '\n';
  html += '\t\t\t\t\t' + '});' + '\n';
  html += '\t\t\t\t\t' + "if (child.className.includes('is-active')) {" + '\n';
  html += '\t\t\t\t\t\t' + 'tabSystem.toggle(child.dataset.target);' + '\n';
  html += '\t\t\t\t\t' + '}' + '\n';
  html += '\t\t\t\t' + '});' + '\n';
  html += '\t\t\t' + '});' + '\n';
  html += '\t\t' + '},' + '\n';
  html += '\t\t' + 'toggle(targetId) {' + '\n';
  html += '\t\t\t' + "document.querySelectorAll('.tab-content').forEach(contentElement => {" + '\n';
  html += '\t\t\t\t' + "contentElement.style.display = contentElement.id === targetId ? 'block' : 'none';" + '\n';
  html +=
    '\t\t\t\t' +
    "document.querySelector(`[data-target=\"${contentElement.id}\"]`).classList[contentElement.id === targetId ? 'add' : 'remove']('is-active');" +
    '\n';
  html += '\t\t\t' + '})' + '\n';
  html += '\t\t' + '},' + '\n';
  html += '\t' + '};' + '\n';
  html += '\t' + 'tabSystem.init()' + '\n';
  html += '</script>' + '\n';

  return html;
}
