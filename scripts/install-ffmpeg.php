<?php

/**
 * Downloads a static ffmpeg + ffprobe build into ./bin/ during composer install.
 *
 * Why: Laravel Cloud's runtime image doesn't include ffmpeg, and we have no way
 * to apt-install it. johnvansickle.com publishes self-contained Linux x86_64
 * static builds that work on any glibc-based container with no dependencies.
 *
 * Skips silently when:
 *  - The binaries already exist (idempotent across deploys)
 *  - We're not on Linux (local dev on Windows/macOS uses system ffmpeg or none)
 *  - The download / extract fails (graceful degradation — the queued transcode
 *    job will log a warning and serve the original file instead of crashing)
 */

$root = dirname(__DIR__);
$binDir = $root . '/bin';
$ffmpeg = $binDir . '/ffmpeg';
$ffprobe = $binDir . '/ffprobe';

// Idempotent: skip if both binaries already present.
if (is_file($ffmpeg) && is_file($ffprobe)) {
    fwrite(STDOUT, "[ffmpeg] already installed at {$binDir}\n");
    exit(0);
}

// Only meaningful on Linux deploy hosts.
if (PHP_OS_FAMILY !== 'Linux') {
    fwrite(STDOUT, "[ffmpeg] skipping install on " . PHP_OS_FAMILY . " (use system ffmpeg locally)\n");
    exit(0);
}

if (!is_dir($binDir) && !@mkdir($binDir, 0755, true)) {
    fwrite(STDERR, "[ffmpeg] could not create {$binDir}, skipping\n");
    exit(0);
}

$arch = trim((string) @shell_exec('uname -m')) ?: 'x86_64';
$archMap = [
    'x86_64'  => 'amd64',
    'aarch64' => 'arm64',
    'arm64'   => 'arm64',
];
$pkgArch = $archMap[$arch] ?? 'amd64';

$url = "https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-{$pkgArch}-static.tar.xz";
$tmp = tempnam(sys_get_temp_dir(), 'ff_') . '.tar.xz';

fwrite(STDOUT, "[ffmpeg] downloading {$url}\n");

$ctx = stream_context_create(['http' => ['timeout' => 300, 'follow_location' => 1]]);
$bytes = @file_get_contents($url, false, $ctx);

if ($bytes === false || strlen($bytes) < 1_000_000) {
    fwrite(STDERR, "[ffmpeg] download failed — transcoding will degrade gracefully\n");
    @unlink($tmp);
    exit(0);
}

file_put_contents($tmp, $bytes);

// Extract just the two binaries we need, flattened into bin/.
$cmd = sprintf(
    'tar -xJf %s -C %s --strip-components=1 --wildcards "*/ffmpeg" "*/ffprobe" 2>&1',
    escapeshellarg($tmp),
    escapeshellarg($binDir)
);
$out = shell_exec($cmd);
@unlink($tmp);

if (!is_file($ffmpeg) || !is_file($ffprobe)) {
    fwrite(STDERR, "[ffmpeg] extract failed: {$out}\n");
    exit(0);
}

@chmod($ffmpeg, 0755);
@chmod($ffprobe, 0755);

fwrite(STDOUT, "[ffmpeg] installed at {$ffmpeg}\n");
exit(0);
