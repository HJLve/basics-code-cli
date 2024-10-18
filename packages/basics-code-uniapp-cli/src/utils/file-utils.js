import fs from 'fs-extra';
import path from 'path';

export async function copyTemplate(src, dest) {
    await fs.copy(src, dest);
}

export async function updateJsonFile(filePath, updates) {
    try {
        const exists = await fs.pathExists(filePath);
        if (exists) {
            const data = await fs.readJson(filePath);
            Object.assign(data, updates);
            await fs.writeJson(filePath, data, { spaces: 2 });
        }
    } catch (err) {
        console.error('生成文件时发生错误:', err);
    }
}