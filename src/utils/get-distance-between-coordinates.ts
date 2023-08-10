/**
 * Fórmula de Haversine
 *
 * Primeiro, a função verifica se as duas coordenadas são iguais e retorna 0 se for o caso, indicando que a distância entre elas é zero.
 * Em seguida, a função converte as coordenadas de graus para radianos e calcula a diferença de longitude entre as duas coordenadas.
 * A fórmula de Haversine é usada para calcular a distância entre os dois pontos.
 * Essa fórmula usa a lei dos cossenos para calcular a distância entre dois pontos em uma esfera, como a Terra.
 * A distância é então convertida em milhas e depois em quilômetros, e o resultado é retornado como um número de ponto flutuante que representa a distância em quilômetros entre as duas coordenadas.
 */

export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
