$(function () {
  $("#search").submit((event) => {
    event.preventDefault()
    console.log('submitting form')
    const input = $("#query").val()
    console.log(input)

    search(input)
  })

  function search(query) {
    const url = "https://api.giphy.com/v1/gifs/search"
    const apiKey = 'ADD_YOUR_API_KEY_HERE'

    $.ajax({
      url: url,
      type: "GET",
      data: { api_key: apiKey, q: query, limit: 50 }
    })
    .done((response) => {
      // execute this function if request is successful
      console.log(response.data)

      // pass array of gifs as a parameter from API to displayResult() function
      displayResults(response.data)
    })
    .fail(() => {
      // execute this function if request fails
      alert('error occurred')
    })
  }

  function displayResults(gifs) {
    // gifs = [{}, {}, {}]

    const gifRows = gifs.map((gif) => {
      // generate an html row (<tr>) for each gif in our array
      return (
        `
        <tr>
          <td>${gif.title}</td>
          <td>
            <img src="${gif.images.fixed_width_small.url}" />
          </td>
          <td>${gif.rating}</td>
          <td><a href="${gif.url}" target="_blank">${gif.url}</a></td>
        </tr>
        `
      )
    })

    console.log(gifRows)

    $('tbody').html(gifRows)
  }

})
