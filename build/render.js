const StlThumbnailer = require('node-stl-thumbnailer');
const fs = require('fs');

const sourceDir = `${__dirname}/../dist/`;
const targetDir = `${__dirname}/../dist/thumbs/`;

const thumbnailer = (source, camera, target) => new StlThumbnailer({
        filePath: source,
        requestThumbnails: [
            {
                width: 250,
                height: 250,
                baseColor: 0xaaaaaa,
                cameraAngle: camera
            }
        ]
    })
    .then(function(thumbnails){
        thumbnails[0].toBuffer(function(err, buf){
            fs.writeFileSync(target, buf);
        })
    });

thumbnailer(`${sourceDir}mount.stl`, [100, 50, 100], `${targetDir}mount-side.png`);
thumbnailer(`${sourceDir}mount.stl`, [50, 50, -100], `${targetDir}mount-back.png`);

thumbnailer(`${sourceDir}panel.stl`, [100, 50, 100], `${targetDir}panel-back.png`);
thumbnailer(`${sourceDir}panel.stl`, [50, 50, -100], `${targetDir}panel-front.png`);
