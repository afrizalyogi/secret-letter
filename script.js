import { CONFIG } from './config.js'

const spreadsheetURL = CONFIG.DATA_URL
const eventName = CONFIG.EVENT_NAME
const eventNameText = document.getElementById('event-name')

eventNameText.textContent = eventName

fetch(spreadsheetURL)
  .then((response) => response.text())
  .then((data) => {
    const rows = data.split('\n').slice(1)
    const container = document.getElementById('container')
    const loading = document.getElementById('loading')

    const shuffledRows = rows.sort(() => Math.random() - 0.5)

    shuffledRows.forEach((row, index) => {
      const columns = row.split(',')
      const from = columns[1].trim()
      const to = columns[2].trim()
      const message = columns[3].trim()

      const box = document.createElement('div')
      box.className = 'box'
      box.addEventListener('click', () => {
        showModal(from, to, message, box)
      })

      container.appendChild(box)
    })

    loading.style.display = 'none'
    container.style.display = 'flex'
  })

function showModal(from, to, message, box) {
  document.getElementById('modal-title').textContent = `Untuk: ${to}`
  document.getElementById(
    'modal-message'
  ).innerHTML = `<p>${message}</p><p><strong>Dari: ${from}</strong></p>`
  document.getElementById('modal').style.display = 'block'

  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none'
    box.style.backgroundColor = '#FF5733'
  })
}

window.onclick = function (event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none'
  }
}
