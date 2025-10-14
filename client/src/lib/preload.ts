export type PreloadOptions = {
  concurrency?: number;
  retries?: number;
  timeoutMsPerImage?: number; // safety timeout per image
  onProgress?: (completed: number, total: number) => void;
};

function loadOne(src: string, timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const onDone = () => {
      cleanup();
      resolve();
    };
    const onError = (err?: any) => {
      cleanup();
      reject(err || new Error('Image failed to load'));
    };

    const cleanup = () => {
      clearTimeout(timer as any);
      img.onload = null;
      img.onerror = null;
    };

    let timer: number | null = null;
    if (timeoutMs > 0) {
      timer = window.setTimeout(() => onError(new Error('Image load timeout')), timeoutMs);
    }

    img.onload = async () => {
      const anyImg = img as any;
      if (typeof anyImg.decode === 'function') {
        try {
          await anyImg.decode();
        } catch {
          // ignore decode failures, already loaded
        }
      }
      onDone();
    };
    img.onerror = onError;
    img.src = src;
  });
}

export async function preloadImages(
  urls: string[],
  opts: PreloadOptions = {}
): Promise<void> {
  const concurrency = Math.max(1, Math.min(opts.concurrency ?? 8, 16));
  const retries = Math.max(0, Math.min(opts.retries ?? 2, 5));
  const timeoutMsPerImage = Math.max(0, opts.timeoutMsPerImage ?? 15000);

  const total = urls.length;
  let completed = 0;
  const report = () => opts.onProgress?.(completed, total);

  const queue = urls.slice();

  async function worker() {
    while (queue.length) {
      const src = queue.shift()!;
      let attempt = 0;
      while (true) {
        try {
          await loadOne(src, timeoutMsPerImage);
          completed++;
          report();
          break;
        } catch (e) {
          if (attempt < retries) {
            attempt++;
            continue;
          } else {
            // Consider failed but continue; still count to avoid blocking
            completed++;
            report();
            break;
          }
        }
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, () => worker());
  await Promise.all(workers);
}


