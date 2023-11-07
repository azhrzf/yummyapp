const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../../public/images/heros');
const destination = path.resolve(__dirname, '../../public/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
    .forEach((image) => {
      sharp(`${target}/${image}`)
          .metadata()
          .then((metadata) => {
            const {width, height} = metadata;
            const aspectRatio = width / height;
            const newHeight = Math.round(300 / aspectRatio);
            sharp(`${target}/${image}`)
                .resize({width: 300, height: newHeight})
                .toFile(path.resolve(
                    __dirname,
                    `${destination}/${image.split('.')
                        .slice(0, -1).join('.')}-small.jpg`),
                );
          });
    });
