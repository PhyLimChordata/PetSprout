/**gets the beginning of the interval in which the key lies based on the given property
 * i.e.
 * map = {
 *  1: {'a': 2},
 *  2: {'a': 4},
 *  3: {'a': 6},
 * }
 *
 * intervalGet(5, 'a', map)
 * > 2
 * since 5 is greater than 4 and less than 6
 * PREREQUISITE: the props in the map are in ascending order
 **/
export let intervalGet = (key, prop, map) => {
	let keys = Object.keys(map);
	for (let endpoint of keys) {
		if (endpoint[prop] >= key) {
			return endpoint;
		}
	}
};
