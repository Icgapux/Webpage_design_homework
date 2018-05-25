Obstacle.types = [{
    type: 'CACTUS_SMALL',
    width: 17,
    height: 35,
    yPos: 105,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [new CollisionBox(0, 7, 5, 27), new CollisionBox(4, 0, 6, 34), new CollisionBox(10, 4, 7, 14)]
}, {
    type: 'CACTUS_LARGE',
    width: 25,
    height: 50,
    yPos: 90,
    multipleSpeed: 7,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [new CollisionBox(0, 12, 7, 38), new CollisionBox(8, 0, 7, 49), new CollisionBox(13, 10, 10, 38)]
}, {
    type: 'PTERODACTYL',
    width: 46,
    height: 40,
    yPos: [100, 75, 50],
    yPosMobile: [100, 50],
    multipleSpeed: 999,
    minSpeed: 8.5,
    minGap: 150,
    collisionBoxes: [new CollisionBox(15, 15, 16, 5), new CollisionBox(18, 21, 24, 6), new CollisionBox(2, 14, 4, 3), new CollisionBox(6, 10, 4, 7), new CollisionBox(10, 8, 6, 9)],
    numFrames: 2,
    frameRate: 1000 / 6,
    speedOffset: .8
}];

HorizonLine.dimensions = {
    WIDTH: 600,
    HEIGHT: 12,
    YPOS: 127
};

Cloud.config = {
    HEIGHT: 14,
    MAX_CLOUD_GAP: 400,
    MAX_SKY_LEVEL: 30,
    MIN_CLOUD_GAP: 100,
    MIN_SKY_LEVEL: 71,
    WIDTH: 46
};

Trex.config = {
    DROP_VELOCITY: -5,
    GRAVITY: 0.6,
    HEIGHT: 47,
    HEIGHT_DUCK: 25,
    INIITAL_JUMP_VELOCITY: -10,
    INTRO_DURATION: 1500,
    MAX_JUMP_HEIGHT: 30,
    MIN_JUMP_HEIGHT: 30,
    SPEED_DROP_COEFFICIENT: 3,
    SPRITE_WIDTH: 262,
    START_X_POS: 50,
    WIDTH: 44,
    WIDTH_DUCK: 59
};

Runner.spriteDefinition = {
    LDPI: {
        CACTUS_LARGE: {
            x: 332,
            y: 2
        },
        CACTUS_SMALL: {
            x: 228,
            y: 2
        },
        CLOUD: {
            x: 86,
            y: 2
        },
        HORIZON: {
            x: 2,
            y: 54
        },
        PTERODACTYL: {
            x: 134,
            y: 2
        },
        RESTART: {
            x: 2,
            y: 2
        },
        TEXT_SPRITE: {
            x: 484,
            y: 2
        },
        TREX: {
            x: 677,
            y: 2
        }
    },
    HDPI: {
        CACTUS_LARGE: {
            x: 652,
            y: 2
        },
        CACTUS_SMALL: {
            x: 446,
            y: 2
        },
        CLOUD: {
            x: 166,
            y: 2
        },
        HORIZON: {
            x: 2,
            y: 104
        },
        PTERODACTYL: {
            x: 260,
            y: 2
        },
        RESTART: {
            x: 2,
            y: 2
        },
        TEXT_SPRITE: {
            x: 954,
            y: 2
        },
        TREX: {
            x: 1338,
            y: 2
        }
    }
}
