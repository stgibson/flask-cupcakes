const baseUrl = "http://127.0.0.1:5000/api/cupcakes"
const defaultImage = "https://tinyurl.com/demo-cupcake"

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
 * @param {Object} cupcake 
 */
function addCupcakeToList(cupcake) {
  const $cupcakesList = $("#cupcakes-list");
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

  cupcakes.forEach(cupcake => addCupcakeToList(cupcake));
}

/**
 * Makes sure user typed in valid input for creating a cupcake
 * @param {string} cupcake
 * @return {boolean} True if all values in cupcake are valid, false otherwise
 */
function validateInput(cupcake) {
  // flavor, size, and rating inputs are required
  if (!cupcake.flavor.trim() || !cupcake.size.trim() ||
    !cupcake.rating.trim()) {
    return false;
  }
  return true;
}

function addCupcakeToDatabase(cupcake) {
  axios.post(baseUrl, json=cupcake);
}

/**
 * Creates a new cupcake, adds it to the db, and appends it to the html list.
 * @param {Object} event 
 */
function createCupcake(event) {
  event.preventDefault();

  const cupcake = {};
  cupcake.flavor = $("#flavor").val();
  cupcake.size = $("#size").val();
  cupcake.rating = $("#rating").val();
  cupcake.image = $("#image").val();

  if (validateInput(cupcake)) {
    addCupcakeToDatabase(cupcake);
    // set the default image of cupcake for displaying
    cupcake.image = defaultImage;
    addCupcakeToList(cupcake);
  }
}

$(showListOfCupcakes);

$("#add-cupcake-form").on("submit", createCupcake);