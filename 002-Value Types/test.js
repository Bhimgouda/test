const tasks = [
  {
    test: async (logicDriver, expect) => {
      const justABoolean = await logicDriver.persistentState.get(
        "justABoolean"
      );
      expect(justABoolean).to.be.equal(true);
    },
  },
  {
    test: async (logicDriver, expect) => {
      const justAString = await logicDriver.persistentState.get("justAString");
      expect(justAString).to.be.equal("I am a string");
    },
  },
  {
    test: async (logicDriver, expect) => {
      const bit64Integer = await logicDriver.persistentState.get(
        "bit64Integer"
      );
      expect(bit64Integer).to.be.equal(-20);
    },
  },
  {
    test: async (logicDriver, expect) => {
      const bit256Integer = await logicDriver.persistentState.get(
        "bit256Integer"
      );
      expect(bit256Integer).to.be.equal(50);
    },
  },
  {
    test: async (logicDriver, expect) => {
      const bit64UnsignedInteger = await logicDriver.persistentState.get(
        "bit64UnsignedInteger"
      );
      expect(bit64UnsignedInteger).to.be.equal(20);
    },
  },
  {
    test: async (logicDriver, expect) => {
      const bit256UnsignedInteger = await logicDriver.persistentState.get(
        "bit256UnsignedInteger"
      );
      expect(bit256UnsignedInteger).to.be.equal(50);
    },
  },
];
