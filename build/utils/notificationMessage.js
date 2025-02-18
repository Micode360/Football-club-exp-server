"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMessage = void 0;
const notificationMessage = (type, data) => {
    switch (type) {
        case 'request':
            return `<div>
                <p><span className="text-blue-500 text-md">${data.name}</span> ${data.description}</p>
              </div>
             `;
        case 'user-type':
            return `<div>
                <p><span className="text-blue-500 text-md">${data.name}</span> ${data.description}</p>
              </div>
                `;
        case 'non-user-type':
            return `<div>
                  <p>${data.description}</p>
                        </div>
                    `;
        default:
            break;
    }
};
exports.notificationMessage = notificationMessage;
