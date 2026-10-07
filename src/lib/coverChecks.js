// Pure cover-dimension checks. Lifted verbatim from CoverCheckerPage.js so the
// cover tool and the readiness report share one copy of every rule.
// No UI, no tracking — just measurements in, check rows out.

export const KDP_MIN_WIDTH = 625;
export const KDP_MIN_HEIGHT = 1000;
export const KDP_MAX_FILE_SIZE_MB = 50;
export const KDP_RECOMMENDED_LONG_SIDE = 2560;
export const KDP_RATIO = 1.6;
export const KDP_RATIO_TOLERANCE = 0.08;
export const APPLE_MIN_SHORT_SIDE = 1400;

// KDP accepts JPEG or TIFF (KDP Help G200645690). Most browsers can't decode
// TIFF, so when one fails to load we show this note instead of an error.
export const TIFF_NOTE = 'KDP accepts TIFF. To check size here, export a JPEG copy.';
export const isTiff = (file) => file.type === 'image/tiff' || /\.tiff?$/i.test(file.name);

export function checkKDP(width, height, fileType, fileSizeMB) {
  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  const ratio = longSide / shortSide;
  const isPortrait = height >= width;

  const checks = [];

  const isJpeg = fileType === 'image/jpeg' || fileType === 'image/jpg';
  const isTiffType = fileType === 'image/tiff';
  checks.push({
    label: 'Format',
    pass: isJpeg || isTiffType,
    detail: isJpeg
      ? 'JPEG — accepted'
      : isTiffType
        ? 'TIFF — accepted'
        : `${fileType.replace('image/', '').toUpperCase()} — KDP accepts JPEG or TIFF`,
  });

  checks.push({
    label: 'Orientation',
    pass: isPortrait,
    detail: isPortrait ? 'Portrait — correct' : 'Landscape or square — covers must be portrait',
  });

  checks.push({
    label: 'Minimum size',
    pass: width >= KDP_MIN_WIDTH && height >= KDP_MIN_HEIGHT,
    detail: `${width}×${height}px — minimum is ${KDP_MIN_WIDTH}×${KDP_MIN_HEIGHT}px (width and height checked independently)`,
  });

  checks.push({
    label: 'Recommended size',
    pass: longSide >= KDP_RECOMMENDED_LONG_SIDE,
    detail: longSide >= KDP_RECOMMENDED_LONG_SIDE
      ? `${longSide}px — meets the ${KDP_RECOMMENDED_LONG_SIDE}px recommendation`
      : `${longSide}px — below the ${KDP_RECOMMENDED_LONG_SIDE}px recommendation, may look soft on high-res screens`,
    warning: longSide < KDP_RECOMMENDED_LONG_SIDE && width >= KDP_MIN_WIDTH && height >= KDP_MIN_HEIGHT,
  });
  // KDP calls 1.6:1 "ideal", not required, so an off ratio warns instead of failing.
  const ratioOk = Math.abs(ratio - KDP_RATIO) <= KDP_RATIO_TOLERANCE;
  checks.push({
    label: 'Aspect ratio',
    pass: ratioOk,
    detail: `${ratio.toFixed(2)}:1 — ideal is ${KDP_RATIO}:1`,
    warning: !ratioOk,
  });

  if (fileSizeMB !== undefined) {
    checks.push({
      label: 'File size',
      pass: fileSizeMB <= KDP_MAX_FILE_SIZE_MB,
      detail: `${fileSizeMB.toFixed(2)}MB — KDP limit is ${KDP_MAX_FILE_SIZE_MB}MB`,
    });
  }

  const hardFails = checks.filter(c => !c.pass && !c.warning).length;
  return { checks, status: hardFails === 0 ? 'pass' : 'fail' };
}

export function checkApple(width, height) {
  const shortSide = Math.min(width, height);
  const checks = [{
    label: 'Minimum width',
    pass: shortSide >= APPLE_MIN_SHORT_SIDE,
    detail: `${shortSide}px shortest side — minimum is ${APPLE_MIN_SHORT_SIDE}px`,
  }];
  return { checks, status: checks[0].pass ? 'pass' : 'fail' };
}
