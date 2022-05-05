import { Worker, NEAR, NearAccount } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // deploy contract
  const root = worker.rootAccount;
  const contract = await root.createAndDeploy(
    root.getSubAccount("rust-counter").accountId,
    "./out/main.wasm",
    { initialBalance: NEAR.parse("30 N").toJSON() }
  );

  // some test accounts
  const alice = await root.createSubAccount("alice", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });
  const bob = await root.createSubAccount("bob", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });
  const charlie = await root.createSubAccount("charlie", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract, alice, bob, charlie };
});

test.afterEach(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("#TODO", async (t) => {
    // const { root, contract } = t.context.accounts;
    // const startCounter: number = await contract.view("get_num", {});
    // await root.call(contract, "increment", {});
    // const endCounter = await contract.view("get_num", {});
    // t.is(endCounter, startCounter + 1);
    console.log("✅");
  });