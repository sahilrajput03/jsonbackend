(async () => {
  await writeJsonFile("mydatabase.json", {foo: true});
})();

(async () => {
  console.log(await loadJsonFile("mydatabase.json"));
  //=> {foo: true}
})();
