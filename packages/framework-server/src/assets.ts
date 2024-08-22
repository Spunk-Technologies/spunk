import LiveDirectory from "live-directory";
import { DEV_MODE } from "./config";
import fs from "fs";

try {
  fs.mkdirSync("build");
} catch {}

export const assets = new LiveDirectory("build", {
  // Optional: Configure filters to ignore or include certain files, names, extensions etc etc.
  filter: {
    // keep: {
    //   names: ["index"],
    //   extensions: [".css", ".json", ".png", ".jpg", ".jpeg"],
    // },
    // ignore: (path) => {
    //   // You can define a function to perform any kind of matching on the path of each file being considered by LiveDirectory
    //   // For example, the below is a simple dot-file ignore match which will prevent any files starting with a dot from being loaded into live-directory
    //   return path.startsWith(".");
    // },
  },

  watcher: !DEV_MODE
    ? undefined
    : {
        // TODO add watcher config
      },

  // Optional: You can customize how LiveDirectory caches content under the hood
  cache: {
    // The parameters below can be tuned to control the total size of the cache and the type of files which will be cached based on file size
    // For example, the below configuration (default) should cache most <1 MB assets but will not cache any larger assets that may use a lot of memory
    // In the scenario that LiveDirectory encounters an uncached file, It will s
    max_file_count: 250, // Files will only be cached up to 250 MB of memory usage
    max_file_size: 1024 * 1024, // All files under 1 MB will be cached
  },
});
