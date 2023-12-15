import Module from "module";
import { USE_SET_DURING_MODULE_RESOLUTION } from "/Users/geoffrey/Programming/framework-without-a-name/packages/framework/src/config";

function createModuleResolverWithSet(
  disAllowedModules: string[],
): ProxyHandler<NodeRequire> {
  const disAllowedModulesSet = new Set(disAllowedModules);
  return {
    apply(target, thisArg, argArray) {
      if (disAllowedModulesSet.has(argArray[0])) {
        throw new Error(`'${argArray[0]}' is a disallowed module`);
      }
      return Reflect.apply(target, thisArg, argArray);
    },
  };
}

function createModuleResolverNoSet(
  disAllowedModules: string[],
): ProxyHandler<NodeRequire> {
  return {
    apply(target, thisArg, argArray) {
      if (disAllowedModules.includes(argArray[0])) {
        throw new Error(`'${argArray[0]}' is a disallowed module`);
      }
      return Reflect.apply(target, thisArg, argArray);
    },
  };
}

export function requireFromString(
  src: string,
  filename: string,
  dir: string,
  disAllowedModules: string[],
): unknown {
  // console.log(`Module.wrap(${filename}) = ${Module.wrap(src)}`);
  // console.log(`${filename} = ${src}`);

  const requireWithDisAllows: NodeRequire = new Proxy(
    require,
    USE_SET_DURING_MODULE_RESOLUTION
      ? createModuleResolverWithSet(disAllowedModules)
      : createModuleResolverNoSet(disAllowedModules),
  );

  const m = {
    exports: {} as any,
  };

  try {
    // function (exports, require, module, __filename, __dirname)
    const f: (
      exports: any,
      require: NodeRequire,
      module: typeof m,
      filename: string,
      dirname: string,
    ) => void = new Function(`return ${Module.wrap(src)}`)();
    f(m.exports, requireWithDisAllows, m, filename, dir);
  } catch (e) {
    console.log(`${filename} = ${src}`);
    throw e;
  }

  return m.exports;
}
