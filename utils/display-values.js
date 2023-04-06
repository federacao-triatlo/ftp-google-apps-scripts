function getDisplayValue(originalValue) {
  const ptLabels = {
    athleteID: 'ID do Atleta',
    ageGroup: 'Escalão',
    bib: 'Dorsal',
    cycling: 'Ciclismo',
    date: 'Data',
    error: 'Erro',
    firstRun: 'Corrida',
    gap: 'Delta',
    gender: 'Género',
    licence: 'Licença',
    location: 'Local',
    name: 'Nome',
    overall: 'Absolutos',
    points: 'Pontos',
    rank: '#',
    results: 'Resultados',
    resultsPlaceholder: 'Escolher uma prova',
    run: 'Corrida',
    secondRun: 'Corrida',
    swim: 'Natação',
    team: 'Clube',
    t1: 'T1',
    t2: 'T2',
    time: 'Hora',
    total: 'Total',
  };

  return ptLabels[originalValue];
}
