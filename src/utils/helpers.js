/**
 * 문자열을 URL 친화적인 슬러그로 변환합니다.
 * @param {string} text - 슬러그로 변환할
 * @param {string} [separator='-'] - 단어 사이의 구분자
 * @returns {string} - URL 슬러그
 */
export function slugify(text, separator = '-') {
  return text
    .toString()
    .normalize('NFD')                 // 문자를 분해
    .replace(/[\u0300-\u036f]/g, '') // 발음 구별 기호 제거
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')      // 알파벳과 숫자가 아닌 문자 제거
    .replace(/\s+/g, separator)      // 공백을 구분자로 대체
    .replace(/-+/g, separator);      // 연속된 구분자를 하나로 변경
}

/**
 * ISO 형식의 날짜 문자열을 포맷팅합니다.
 * @param {string} isoString - ISO 형식의 날짜 문자열
 * @param {object} options - Intl.DateTimeFormat 옵션
 * @returns {string} - 포맷팅된 날짜 문자열
 */
export function formatDate(isoString, options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', options);
}

/**
 * 텍스트를 지정된 길이로 자릅니다.
 * @param {string} text - 잘라낼 텍스트
 * @param {number} length - 최대 길이
 * @returns {string} - 자른 텍스트
 */
export function truncateText(text, length = 150) {
  if (!text || text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * 페이지네이션을 위한 페이지 범위를 계산합니다.
 * @param {number} currentPage - 현재 페이지
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} maxVisible - 최대 표시 페이지 수
 * @returns {Array} - 표시할 페이지 범위
 */
export function generatePagination(currentPage, totalPages, maxVisible = 5) {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfVisible = Math.floor(maxVisible / 2);
  let start = currentPage - halfVisible;
  let end = currentPage + halfVisible;

  if (start < 1) {
    start = 1;
    end = maxVisible;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxVisible + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
} 