// Hide all promoted answers on Quora.
const elements = document.querySelectorAll('.dom_annotate_ad_promoted_answer');
elements.forEach((el) => el.style.display = 'none');

// Theory: This code hides 'Related' answers on Quora.
// Currently it hides all answers containing the word 'Related', too. Commented out for now.

// const spans = document.querySelectorAll('span');

// spans.forEach(span => {
//   if (span.textContent.includes('Related')) {
//     const parent = span.closest('div');
//     if (parent) {
//       parent.style.display = 'none'
//     }
//   }
// });