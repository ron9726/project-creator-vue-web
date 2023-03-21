#! /usr/bin/env node
const { program } = require("commander");
const { mkdirSync, readFileSync, writeFileSync, readdirSync, copyFile } = require("fs");
const process = require("process");
const child_process = require("child_process");
const path = require("path");
const extendPkg = {
	scripts: {
		dev: "vite",
		build: "vite build",
		serve: "vite preview",
	},
	dependencies: {
		"ant-design-vue": "^3.2.15",
		less: "^4.1.3",
		"less-loader": "^11.1.0",
		pinia: "^2.0.33",
		uuid: "^9.0.0",
		vue: "^3.2.47",
		"vue-router": "^4.1.6",
	},
	devDependencies: {
		"@rushstack/eslint-patch": "^1.2.0",
		"@types/jsdom": "^21.1.0",
		"@types/node": "^18.14.2",
		"@vitejs/plugin-vue": "^4.0.0",
		"@vitejs/plugin-vue-jsx": "^3.0.0",
		"@vue/eslint-config-prettier": "^7.1.0",
		"@vue/eslint-config-typescript": "^11.0.2",
		"@vue/test-utils": "^2.3.0",
		"@vue/tsconfig": "^0.1.3",
		eslint: "^8.34.0",
		"eslint-plugin-vue": "^9.9.0",
		jsdom: "^21.1.0",
		"npm-run-all": "^4.1.5",
		prettier: "^2.8.4",
		typescript: "~4.8.4",
		"unplugin-vue-components": "^0.22.9",
		vite: "^3.2.5",
		"vite-plugin-commonjs": "^0.6.1",
		"vite-plugin-compression": "^0.5.1",
		"vite-plugin-optimize-persist": "^0.1.2",
		"vite-plugin-package-config": "^0.1.1",
		vitest: "^0.29.1",
		"vue-tsc": "^1.2.0",
	},
};
let base;
program
	.command("create [projectName]")
	.description(
		"如果给定项目名称，则会在当前目录下新建项目文件夹，并在项目文件夹下面初始化目录结构，如果不给定项目名称，则会在当前文件夹下面初始化目录结构\n注意：若不给定项目名称，请确保当前文件夹为空文件夹"
	)
	.action((projectName) => {
		let ds = process.cwd();
		try {
			if (projectName) {
				ds = `${ds}\\${projectName}`;
				mkdirSync(ds);
			} else if (readdirSync(ds).length) {
				throw new Error("当前文件夹不是空文件夹");
			}
		} catch (error) {
			console.log("error :>> ", error.message);
			return;
		}
		base = ds;
		console.log("=============init program started=============");
		init(ds);
		console.log("=============init program completed=============");
	});

program.parse();

function executeCommand(cmd, path) {
	return child_process.execSync(cmd, {
		cwd: path,
		stdio: "inherit",
	});
}

function extendPackage(extend) {
	const targetPath = `${base}\\package.json`;
	const mergedPkg = { ...JSON.parse(readFileSync(targetPath, { encoding: "utf-8" })), ...extend };
	const resultPkg = {
		name: undefined,
		version: undefined,
		scripts: undefined,
		dependencies: undefined,
		devDependencies: undefined,
	};
	Object.keys(resultPkg).forEach((key) => {
		resultPkg[key] = mergedPkg[key];
	});
	writeFileSync(targetPath, JSON.stringify(resultPkg, null, 2), {
		flag: "w",
		encoding: "utf-8",
	});
}

function createStructure(targetPath) {
	const resolvedStructurePath = path.join(__dirname, "../projectStructure");
	copyFileTo(targetPath, resolvedStructurePath);
}

function copyFileTo(targetPath, srcPath) {
	const result = readdirSync(srcPath, { withFileTypes: true });
	result.forEach((fileOrDir) => {
		if (fileOrDir.isFile()) {
			const ds = path.join(srcPath, fileOrDir.name);
			const contentBuffer = readFileSync(ds);
			const file = `${targetPath}\\${fileOrDir.name}`;
			writeFileSync(file, contentBuffer, {
				flag: "w+",
			});
			console.log(`File:${file} created.`);
		} else {
			const _targetPath = `${targetPath}\\${fileOrDir.name}`;
			const _srcPath = `${srcPath}\\${fileOrDir.name}`;
			mkdirSync(_targetPath);
			copyFileTo(_targetPath, _srcPath);
		}
	});
}

function createConfig(targetPath) {
	const resolvedConfigPath = path.join(__dirname, "../projectConfig");
	copyFileTo(targetPath, resolvedConfigPath);
	writeFileSync(
		`${targetPath}\\.gitignore`,
		`node_modules
.DS_Store
dist
dist-ssr
*.local
.vscode
*.zip
components.d.ts`,
		{ flag: "w" }
	);
}

function init(initPath) {
	try {
		executeCommand("npm init -y", initPath);
		extendPackage(extendPkg);
		executeCommand(`npm install --legacy-peer-deps`, initPath);
		createStructure(initPath);
		createConfig(initPath);
		const layoutModuleUrl = "http://git.dqalpha.com/frontend/components/web/layout_vue_web.git";
		const layoutPath = "./src/layout";
		const routerModuleUrl = "http://git.dqalpha.com/frontend/components/web/router_vue_web.git";
		const routerPath = "./src/router";
		const alphaComponentModuleUrl = "http://git.dqalpha.com/frontend/components/web/alpha-components-antd.git";
		const alphaComponentPath = "./src/components/alpha-components-antd";
		executeCommand(`git -C "${initPath}" init`);
		executeCommand(`git -C "${initPath}" submodule add ${layoutModuleUrl} ${layoutPath}`);
		executeCommand(`git -C "${initPath}" submodule add ${routerModuleUrl} ${routerPath}`);
		executeCommand(`git -C "${initPath}" submodule add ${alphaComponentModuleUrl} ${alphaComponentPath}`);
	} catch (error) {
		console.log("error :>> ", error);
	}
}
