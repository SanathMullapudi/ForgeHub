
class DedupeSet extends Set {
  add(newVal) {
    return ![...this].find(newVal.equals, newVal) && super.add(newVal) && newVal;
  }

  find(seeking) {
    return [...this].find(seeking.equals, seeking);
  }
}

// export default DedupeSet;

// Manuel compiling, due to babels inability to compile, Extenting Built-in classes
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = DedupeSet;
