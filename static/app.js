const baseUrl = "http://127.0.0.1:5000/api/cupcakes"

/**
 * Gets all cupcakes from db.
 * @return {Array[Object]} An array of all cupcakes
 */
async function getAllCupcakes() {
  const response = await axios.get(baseUrl);
  return response.data.cupcakes;
}

/**
 * Adds the contents of cupcake to the html list $cupcakesList
 * @param {Object} $cupcakesList 
 * @param {Object} cupcake 
 */
function addCupcakeToList($cupcakesList, cupcake) {
  const $cupcakeListItem = $(`
    <div class="col-4">
      <b>${cupcake.flavor}</b>
      <div>Size: ${cupcake.size}</div>
      <div>Rating: ${cupcake.rating}</div>
      <img class="img-fluid mb-5" src="${cupcake.image}" alt="image of cupcake">
    </div>
  `);
  $cupcakesList.append($cupcakeListItem);
}

/**
 * Adds all cupcakes in db to cupcakes-list
 */
async function showListOfCupcakes() {
  const cupcakes = await getAllCupcakes();

  const $cupcakesList = $("#cupcakes-list");
  cupcakes.forEach(cupcake => addCupcakeToList($cupcakesList, cupcake));
}

$(showListOfCupcakes());