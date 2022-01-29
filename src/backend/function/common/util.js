/**gets the beginning of the interval in which the key lies based on the given property
 * i.e.
 * map = {
 *  1: {'a': 2},
 *  2: {'a': 4},
 *  3: {'a': 6},
 * }
 *
 * intervalGet(5, 'a', map)
 * > 3
 * since 5 less than 6 and greater than all prior values (2,4)
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
