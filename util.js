exports.toUpperCase = (name) => {
  return name.split('').map((item, index) => {
    return index === 0 ? item.toUpperCase() : item
  }).join('')
}