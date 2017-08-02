module.exports = {
    "prompts": {
        "name": {
            "type": "input",
            "required": true,
            "message": "Project name"
        },
        "description": {
            "type": "input",
            "required": false,
            "message": "Project description",
            "default": "A Mtime web project"
        },
        "author": {
            "type": "input",
            "message": "Author"
        }
    },
    "completeMessage": "开始开发"
};