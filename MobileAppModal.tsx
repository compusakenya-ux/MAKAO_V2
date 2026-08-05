import React, { useState, useEffect } from 'react';

interface MobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceFrame: 'none' | 'iphone' | 'android';
  setDeviceFrame: (frame: 'none' | 'iphone' | 'android') => void;
}

export const MobileAppModal: React.FC<MobileAppModalProps> = ({
  isOpen,
  onClose,
  deviceFrame,
  setDeviceFrame,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'install' | 'export' | 'frame'>('install');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [copiedCapacitor, setCopiedCapacitor] = useState(false);
  const [copiedAdb, setCopiedAdb] = useState(false);

  const currentAppUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    currentAppUrl
  )}&color=390026&bgcolor=faf1f5`;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        "To install MAKAO directly on your Android phone or iOS device:\n\n• Android (Chrome/Edge): Tap 'Install App' or 3-dots menu -> 'Add to Home screen'\n• iOS (Safari): Tap Share button -> 'Add to Home Screen'\n• Physical Device: Scan the QR Code using your phone camera!"
      );
    }
  };

  const capacitorConfigJson = `{
  "appId": "ke.co.makao.app",
  "appName": "MAKAO",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "url": "${window.location.origin}",
    "cleartext": true
  }
}`;

  const adbCommandText = `adb install makao-app.apk`;

  const copyCapacitorConfig = () => {
    navigator.clipboard.writeText(capacitorConfigJson);
    setCopiedCapacitor(true);
    setTimeout(() => setCopiedCapacitor(false), 2000);
  };

  const copyAdbCommand = () => {
    navigator.clipboard.writeText(adbCommandText);
    setCopiedAdb(true);
    setTimeout(() => setCopiedAdb(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-[#fffbff] w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-[#ffd8ed] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f4ebef]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffd8ed] text-[#e040a0] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">smartphone</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#201a1d]">MAKAO Android & iOS Mobile Hub</h2>
              <p className="text-xs text-[#504349]">
                Direct Phone Install, APK Package Export & Device Simulator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#504349] hover:bg-[#faf1f5] hover:text-[#e040a0] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 p-1.5 bg-[#faf1f5] rounded-full my-4 text-xs font-bold text-[#504349]">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex-1 py-2 rounded-full transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'install' ? 'bg-[#e040a0] text-white shadow-2xs' : 'hover:text-[#e040a0]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">download_for_offline</span>
            Scan & Install App
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 rounded-full transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'export' ? 'bg-[#e040a0] text-white shadow-2xs' : 'hover:text-[#e040a0]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">adb</span>
            Android APK Build / ADB
          </button>

          <button
            onClick={() => setActiveTab('frame')}
            className={`flex-1 py-2 rounded-full transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'frame' ? 'bg-[#e040a0] text-white shadow-2xs' : 'hover:text-[#e040a0]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">devices</span>
            Device Simulator
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          {activeTab === 'install' && (
            <div className="space-y-4">
              {/* Scan QR Code Section */}
              <div className="bg-gradient-to-r from-[#ffd8ed] to-[#faf1f5] p-5 rounded-2xl border border-[#ffd8ed] flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="bg-[#e040a0] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Instant Device Sync
                    </span>
                    <h3 className="font-bold text-[#390026] text-base">Scan with Phone Camera</h3>
                  </div>
                  <p className="text-xs text-[#504349] max-w-sm">
                    Point your Android or iOS phone camera at this QR code to instantly open and install MAKAO on your phone screen!
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="px-5 py-2.5 bg-[#e040a0] text-white font-bold text-xs rounded-full hover:bg-[#390026] transition-colors shadow-md inline-flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">install_mobile</span>
                    {installed ? 'App Installed on Device' : 'Install Direct WebApp'}
                  </button>
                </div>

                <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#ffd8ed] flex flex-col items-center shrink-0">
                  <img src={qrCodeUrl} alt="MAKAO App QR Code" className="w-32 h-32 rounded-lg" />
                  <span className="text-[10px] font-bold text-[#e040a0] mt-1">Scan to open on phone</span>
                </div>
              </div>

              {/* Android Direct Guide */}
              <div className="bg-white p-4 rounded-2xl border border-[#f1dee7] space-y-2">
                <h4 className="font-bold text-xs md:text-sm text-[#201a1d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#e040a0]">android</span>
                  Android Device Direct Installation:
                </h4>
                <ol className="text-xs text-[#504349] space-y-1.5 list-decimal list-inside pl-1">
                  <li>Scan the QR Code or open <strong>Chrome / Edge</strong> on your Android phone.</li>
                  <li>Tap the <strong>Install App</strong> button banner or 3-dots Chrome menu.</li>
                  <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                  <li>MAKAO will run as an isolated WebAPK in full-screen Android mode!</li>
                </ol>
              </div>

              {/* iOS Guide */}
              <div className="bg-white p-4 rounded-2xl border border-[#f1dee7] space-y-2">
                <h4 className="font-bold text-xs md:text-sm text-[#201a1d] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#e040a0]">apple</span>
                  iOS (iPhone / iPad Safari) Installation:
                </h4>
                <ol className="text-xs text-[#504349] space-y-1.5 list-decimal list-inside pl-1">
                  <li>Open this app link in <strong>Safari</strong> on your iPhone.</li>
                  <li>Tap the <strong>Share button</strong> (square with arrow up) at the bottom.</li>
                  <li>Select <strong>"Add to Home Screen"</strong> and tap <strong>Add</strong>.</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="bg-[#faf1f5] p-4 rounded-2xl border border-[#ffd8ed]">
                <h3 className="font-bold text-sm text-[#201a1d] flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#e040a0]">developer_mode</span>
                  Build Standalone Android APK (.apk) or Google Play Bundle (.aab)
                </h3>
                <p className="text-xs text-[#504349]">
                  Convert this application into a native <strong>Android APK file</strong> to upload directly or side-load on any Android phone / emulator via ADB.
                </p>
              </div>

              {/* PWABuilder 1-Click APK */}
              <div className="bg-white p-4 rounded-2xl border border-[#f1dee7] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#ffd8ed] text-[#390026] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Method 1 • Instant Android APK Generator
                  </span>
                  <a
                    href={`https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentAppUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#e040a0] hover:underline flex items-center gap-1"
                  >
                    <span>PWABuilder.com</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
                <h4 className="font-bold text-sm text-[#201a1d]">1-Click Package Generator</h4>
                <p className="text-xs text-[#504349]">
                  1. Go to <strong>PWABuilder.com</strong> (URL auto-loaded).<br />
                  2. Click <strong>"Package for Android"</strong> to download the ready-to-install <strong>.apk</strong> file!<br />
                  3. Transfer the .apk to your phone or Android emulator to install directly.
                </p>
              </div>

              {/* Android Studio & ADB Sideloading */}
              <div className="bg-white p-4 rounded-2xl border border-[#f1dee7] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#faf1f5] text-[#504349] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Method 2 • Android ADB / Capacitor Build
                  </span>
                  <button
                    onClick={copyAdbCommand}
                    className="text-xs font-bold text-[#e040a0] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    {copiedAdb ? 'Copied ADB Command!' : 'Copy ADB Command'}
                  </button>
                </div>
                <h4 className="font-bold text-sm text-[#201a1d]">CLI Android Package & ADB Sideload</h4>
                <div className="bg-[#201a1d] text-[#ffd8ed] p-3 rounded-xl text-xs font-mono overflow-x-auto space-y-1">
                  <p># 1. Install Bubblewrap CLI or Capacitor</p>
                  <p className="text-white">npm install -g @bubblewrap/cli</p>
                  <p className="pt-1"># 2. Build Android APK directly from Manifest</p>
                  <p className="text-white">bubblewrap init --manifest={window.location.origin}/manifest.json</p>
                  <p className="text-white">bubblewrap build</p>
                  <p className="pt-1"># 3. Upload / Install directly to Android device via ADB</p>
                  <p className="text-white">adb install app-release-signed.apk</p>
                </div>
              </div>

              {/* Capacitor Config */}
              <div className="bg-white p-4 rounded-2xl border border-[#f1dee7] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#201a1d]">Capacitor Config snippet</h4>
                  <button
                    onClick={copyCapacitorConfig}
                    className="text-xs font-bold text-[#e040a0] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    {copiedCapacitor ? 'Copied!' : 'Copy Config'}
                  </button>
                </div>
                <pre className="bg-[#faf1f5] p-3 rounded-xl text-[11px] font-mono text-[#201a1d] overflow-x-auto">
                  {capacitorConfigJson}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'frame' && (
            <div className="space-y-4">
              <div className="bg-[#faf1f5] p-4 rounded-2xl border border-[#ffd8ed] text-center space-y-3">
                <h3 className="font-bold text-sm text-[#201a1d]">Mobile Device Shell Simulator</h3>
                <p className="text-xs text-[#504349]">
                  Test MAKAO inside a sleek iPhone 16 Pro or Android Pixel device shell directly inside your browser.
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setDeviceFrame('none');
                      onClose();
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                      deviceFrame === 'none'
                        ? 'bg-[#e040a0] text-white shadow-xs'
                        : 'bg-white text-[#504349] border border-[#d4c2cb]'
                    }`}
                  >
                    Responsive Desktop / Web
                  </button>

                  <button
                    onClick={() => {
                      setDeviceFrame('android');
                      onClose();
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1 ${
                      deviceFrame === 'android'
                        ? 'bg-[#e040a0] text-white shadow-xs'
                        : 'bg-white text-[#504349] border border-[#d4c2cb]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">android</span>
                    Android Pixel Shell
                  </button>

                  <button
                    onClick={() => {
                      setDeviceFrame('iphone');
                      onClose();
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1 ${
                      deviceFrame === 'iphone'
                        ? 'bg-[#e040a0] text-white shadow-xs'
                        : 'bg-white text-[#504349] border border-[#d4c2cb]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">apple</span>
                    iPhone 16 Pro Shell
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#f4ebef] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs hover:bg-[#390026] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

