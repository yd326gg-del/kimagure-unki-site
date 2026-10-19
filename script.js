// HTTPSの正式購入URLを設定。空欄の場合は準備中のまま移動しません。
const purchaseLinks = {
  note: 'https://note.com/dapper_yarrow641/n/n719c63d9e912',
  amazon1: 'https://www.amazon.co.jp/dp/B0HF3LNKHD', // 第1部 青春期
  amazon2: 'https://www.amazon.co.jp/dp/B0HF43Y9N7', // 第2部 頂点から破綻
  amazon3: 'https://www.amazon.co.jp/dp/B0HG76GDR3', // 第3部 タクシードライバー編
};
for (const [platform, url] of Object.entries(purchaseLinks)) {
  if (!url) continue;
  try {
    const parsed = new URL(url);
    const isNote = platform === 'note';
    const validHost = isNote
      ? parsed.hostname === 'note.com'
      : ['amazon.co.jp', 'www.amazon.co.jp', 'amzn.to'].includes(parsed.hostname);
    if (parsed.protocol !== 'https:' || !validHost) continue;
    const link = document.querySelector(`[data-purchase="${platform}"]`);
    if (!link) continue;
    link.href = parsed.href;
    link.innerHTML = isNote
      ? 'noteで記事を読む <span>↗</span>'
      : 'Amazonで本を見る <span>↗</span>';
    link.removeAttribute('aria-disabled');
    document.querySelector(`[data-status="${platform}"]`).hidden = true;
  } catch { /* URLが無効な場合は準備中を維持します。 */ }
}
// 正式表紙が配置された場合だけ表示。未配置時は準備中の表示を維持します。
for (const cover of document.querySelectorAll('.official-cover')) {
  const showCover = () => {
    if (!cover.naturalWidth) return;
    cover.hidden = false;
    cover.nextElementSibling.hidden = true;
  };
  cover.addEventListener('load', showCover);
  cover.addEventListener('error', () => {
    cover.hidden = true;
    cover.nextElementSibling.hidden = false;
  });
  if (cover.complete) showCover();
}
document.getElementById('year').textContent = new Date().getFullYear();
