import { assert } from "chai";

describe("基本数据类型单元测试", () => {
  it("Boolean 类型", () => {
    const isDone = false;
    assert.isFalse(isDone);
    const isDev = true;
    assert.isTrue(true);
    // boxing
    assert.isTrue(new Boolean(0) == false);
    assert.isTrue(new Boolean("") == false);
    assert.isTrue(new Boolean(false) == false);
    assert.isTrue(new Boolean(null) == false);
    assert.isTrue(new Boolean(undefined) == false);
    assert.isTrue(new Boolean(1) == true);
    assert.isFalse(new Boolean(1) === true);
    assert.isTrue(new Boolean("abc") == true);
    assert.isTrue(new Boolean(true) == true);
    assert.isFalse(new Boolean(true) === false);
    assert.notStrictEqual(true, new Boolean(true));
    assert.equal(true, new Boolean(true));
    assert.strictEqual(typeof new Boolean(true), "object");
    assert.strictEqual(typeof true, "boolean");
    assert.strictEqual(typeof false, "boolean");
  });

  it("Number 类型", () => {
    const decimal = 6;
    const hex = 0xd;
    const binary = 0b10;
    const octal = 0o11;
    assert.strictEqual(decimal, 6);
    assert.strictEqual(hex, 13);
    assert.strictEqual(binary, 2);
    assert.strictEqual(octal, 9);

    assert.notStrictEqual(1, new Number(1));
    assert.equal(1, new Number(1));
    assert.strictEqual(typeof 1, "number");

    assert.isTrue(Number.isInteger(3));
    assert.isTrue(Number.isInteger(3.0));
    assert.isFalse(Number.isInteger(3.1));
    assert.isFalse(Number.isInteger(3.00001));
    assert.strictEqual(0.1 + 0.1, 0.2);
    assert.notEqual(0.3 - 0.1, 0.2);
    const f1 = 0.3 - 0.1;
    const f2 = 0.2;
    console.info("epsilon ", Number.EPSILON);
    assert.isTrue(Math.abs(f1 - f2) <= Number.EPSILON * 2);
    assert.equal(3 - 1, 2);
    assert.strictEqual(3, Number.parseInt("3"));
    assert.strictEqual(3, Number.parseInt("3.1"));
    assert.strictEqual(3, Number.parseInt("3a"));
    assert.notEqual(3, Number.parseInt("a3"));
    assert.strictEqual(3.0, Number.parseFloat("3.0"));
    assert.strictEqual(3.1, Number.parseFloat("3.1a"));
    assert.strictEqual(3.2, Number.parseFloat("3.2"));
    assert.strictEqual(0.2, Number.parseFloat("0.2"));
    assert.notEqual(3.1, Number.parseFloat("a3.1"));
  });

  it("String  基本属性测试", () => {
    const color = "blue";
    assert.strictEqual(color, "blue");
    assert.strictEqual(color[0], "b");
    assert.notEqual(color[4], "");
    assert.strictEqual(color[4], undefined);

    const firstName = "Lee";
    const myFullname = `I'm ${firstName}`;
    assert.strictEqual(myFullname, "I'm Lee", "插值表达式");
    const age = 17;
    assert.strictEqual(`I'm ${age + 1}`, "I'm 18");
    assert.strictEqual(typeof firstName, "string");

    const strObj = new String("banxi");
    assert.notStrictEqual(strObj, "banxi");
    // primitive type
    assert.equal(strObj, "banxi");
    assert.equal(strObj.length, 5);
    assert.equal("中文abc".length, 5);
  });

  it("String charCode codePoint", () => {
    assert.equal("A".charCodeAt(0), 65);
    assert.equal("a".charCodeAt(0), 97);
    const codes: number[] = [];
    const js = 'console.log("HelloWorld")';
    for (let i = 0; i < js.length; i++) {
      codes[i] = js[i].charCodeAt(0);
    }
    console.info(codes.join(","));
    const strCodes =
      "99,111,110,115,111,108,101,46,108,111,103,40,34,72,101,108,108,111,87,111,114,108,100,34,41";
    let rejs = "";
    const strCodeArray = strCodes.split(",");
    for (const str of strCodeArray) {
      const code = parseInt(str);
      rejs += String.fromCharCode(code);
    }
    eval(rejs);
    assert.strictEqual(String.fromCodePoint(99), String.fromCharCode(99));
    assert.strictEqual("c".codePointAt(0), "c".charCodeAt(0));
    console.info("中 codePointAt 0:", "中".codePointAt(0));
    assert.strictEqual("中".codePointAt(0), "中".charCodeAt(0));
    assert.notEqual("😀".codePointAt(0), "😀".charCodeAt(0));
    assert.equal("😀".charCodeAt(0), 55357);
    assert.equal("😀".charCodeAt(1), 56832);
    assert.equal("😀".codePointAt(0), 128512); //1,3 4
    assert.equal("😀".codePointAt(1), 56832);
    console.log("2**16", Math.pow(2, 16)); // Unicode 16  65536
  });

  it("String indexOf/lastIndexOf", () => {
    assert.strictEqual("a".indexOf("a"), 0);
    assert.strictEqual("a".indexOf("b"), -1);
    assert.strictEqual("aba".lastIndexOf("a"), 2);
  });

  it("String startsWith/endWith", () => {
    assert.isTrue("abc".startsWith("a"));
    assert.isTrue("abc".startsWith("abc"));
    assert.isFalse("abc".startsWith("aB"));

    assert.isTrue("abc".endsWith("c"));
    assert.isTrue("abc".endsWith("abc"));
    assert.isFalse("abC".endsWith("bc"));
  });

  it("String match", () => {
    assert.deepEqual(["abc"], "abc".match(/abc/));
    assert.deepEqual(["abc"], "abc".match(/ab./));
    assert.deepEqual(["abc"], "abc".match(/\w+/));
    assert.deepEqual(["123"], "ab123de".match(/\d+/));
    assert.deepEqual(["abc9"], "$abc9中文".match(/\w+/)); // [A-Za-z0-9-_]
    assert.notEqual(["123", "45"], "ab123de45".match(/\d+/));
  });

  it("String padStart/padEnd", () => {
    assert.equal("ab".padStart(5, "*"), "***ab");
    assert.equal("ab".padEnd(5, "*"), "ab***");
  });

  it("String repeat", () => {
    assert.equal("*".repeat(5), "*****");
    assert.equal("**".repeat(5), "**********");
  });

  it("String replace", () => {
    assert.equal("abc1238".replace("abc", ""), "1238");
    assert.equal("abc1238".replace(/\d+/, ""), "abc");
  });

  it("String search", () => {
    assert.equal("abc123".search(/\d+/), 3);
    assert.equal("abc".search(/\d+/), -1);
  });

  it("String slice", () => {
    const nickname = "banxi1988";
    assert.equal("banxi1988", nickname.slice(0));
    assert.equal("1988", nickname.slice(5));
    assert.equal("banxi1988", nickname);
    assert.equal("abc123cd".slice(3, -2), "123");
  });

  it("String split", () => {
    assert.deepEqual("a/b/c".split("/"), ["a", "b", "c"]);
    assert.deepEqual(
      "a/b/c/d/e".split("/", 2),
      ["a", "b"],
      "注意 Limit指的是返回的数组的长度"
    );
    assert.deepEqual("a/b/c".split("/", 0), []);
    assert.deepEqual(
      "".split("/"),
      [""],
      "空字符串分割之后返回的是带有一个空字符串的数组"
    );
    assert.notDeepEqual("has 3 apple 20 orange".split(/\d+/), [
      "has",
      "apple",
      "orange"
    ]);
    assert.notDeepEqual("has 3 apple 20 orange".split(/(\d+)/), [
      "has",
      "3",
      "apple",
      "20",
      "orange"
    ]);
    assert.deepEqual("abc".split(""), ["a", "b", "c"]);
    assert.deepEqual("ab中文".split(""), ["a", "b", "中", "文"]);
    assert.notDeepEqual("résumé".split(""), ["r", "é", "s", "u", "m", "é"]);
    assert.notDeepEqual("résumé".split(/(?:)/u), [
      "r",
      "é",
      "s",
      "u",
      "m",
      "é"
    ]);
  });

  it("Object  比较测试", () => {
    const obj1 = { name: "banxi" };
    const obj2 = { name: "banxi" };
    assert.notEqual(obj1, obj2);
    assert.deepEqual(obj1, obj2);
    // equals
    // ******
  });
});
