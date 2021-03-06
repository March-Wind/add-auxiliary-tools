"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript = __importStar(require("typescript"));
const path = __importStar(require("path"));
const transformer = (_) => (transformationContext) => (sourceFile) => {
    debugger
    console.log(11111);
    function visitNode(node) {
        if (shouldMutateModuleSpecifier(node)) {
            if (typescript.isImportDeclaration(node)) {
                const newModuleSpecifier = typescript.createLiteral(`${node.moduleSpecifier.text}.js`);
                node = typescript.updateImportDeclaration(node, node.decorators, node.modifiers, node.importClause, newModuleSpecifier);
            }
            else if (typescript.isExportDeclaration(node)) {
                const newModuleSpecifier = typescript.createLiteral(`${node.moduleSpecifier.text}.js`);
                node = typescript.updateExportDeclaration(node, node.decorators, node.modifiers, node.exportClause, newModuleSpecifier);
            }
        }
        return typescript.visitEachChild(node, visitNode, transformationContext);
    }
    function shouldMutateModuleSpecifier(node) {
        if (!typescript.isImportDeclaration(node) && !typescript.isExportDeclaration(node))
            return false;
        if (node.moduleSpecifier === undefined)
            return false;
        // only when module specifier is valid
        if (!typescript.isStringLiteral(node.moduleSpecifier))
            return false;
        // only when path is relative
        if (!node.moduleSpecifier.text.startsWith('./') && !node.moduleSpecifier.text.startsWith('../'))
            return false;
        // only when module specifier has no extension
        if (path.extname(node.moduleSpecifier.text) !== '')
            return false;
        return true;
    }
    return typescript.visitNode(sourceFile, visitNode);
};
exports.default = transformer;
//# sourceMappingURL=index.js.map