import ship from "./ship.js";
test("hit() increases timesHit by one", () => {
  ship.hit();
  expect(ship.timesHit).toBe(1);
});

test("isSunk() returns false when ship has not sunk", () => {
  expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns true when ship has sunk", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
