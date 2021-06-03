const gasStation = require("./gasStation");

describe("gasStation tests", () => {
  it("should pass first test", () => {
    expect(gasStation(["4", "1:1", "2:2", "1:2", "0:1"])).toBe("impossible");
  });

  it("should pass second test", () => {
    expect(gasStation(["4", "0:1", "2:2", "1:2", "3:1"])).toBe(4);
  });

  it("should pass third test", () => {
    expect(gasStation(["4", "0:1", "2:2", "1:2", "1:1"])).toBe("impossible");
  });

  it("should pass fourth test", () => {
    expect(gasStation(["3", "2:3", "2:1", "4:4"])).toBe(2);
  });

  it("should pass fifth test", () => {
    expect(gasStation(["5", "3:3", "1:2", "2:2", "3:2", "4:3"])).toBe(3);
  });

  it("should pass sixth test", () => {
    expect(gasStation(["5", "0:1", "2:1", "3:2", "4:6", "4:3"])).toBe(2);
  });

  it("should pass seventh test", () => {
    expect(gasStation(["2", "1:2", "3:2"])).toBe(2);
  });

  it("should pass eighth test", () => {
    expect(gasStation(["2", "1:2", "1:2"])).toBe("impossible");
  });

  it("should pass ninth test", () => {
    expect(gasStation(["6", "3:2", "2:2", "10:6", "0:4", "1:1", "30:10"])).toBe(
      1
    );
  });

  it("should pass tenth test", () => {
    expect(gasStation(["5", "2:3", "2:3", "2:3", "500:1", "0:495"])).toBe(4);
  });
});
