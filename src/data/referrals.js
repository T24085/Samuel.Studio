export const referralOffer = '20% of eligible service fees on the first paid project from each client you refer.'
export const partnerEmail = 'ops@ondefiant.com'
export const partnerEmailHref = `mailto:${partnerEmail}?${new URLSearchParams({
  subject: 'Samuel Studio - Referral Partner Information',
  body: "Hi Sam,\n\nI'd like information about referring photography or web services.\n\nMy name:\nEmail or phone:\nServices I'm interested in referring:\n\nA little about me:\n",
}).toString().replace(/\+/g, '%20')}`

export const referralSteps = [
  { title: 'Make the introduction.', body: 'Share the work with someone who needs photographs, a website, or an application. A warm introduction is enough; you do not need to quote the project.' },
  { title: 'Make sure we know it was you.', body: 'Ask them to include your name and email or phone in the Referred by field on the inquiry form. A referral code can go there too, if you have one.' },
  { title: 'Earn when the project is complete.', body: 'Sam handles the consultation, scope, and booking. Commission is confirmed after eligible work is completed and payment has cleared.' },
]

export const referralQuestions = [
  { question: 'Can I refer more than one person?', answer: 'Yes. The first-project offer applies separately to each new client you refer, not just the first referral you make.' },
  { question: 'What counts as eligible service fees?', answer: 'The agreed photography or development service fee actually paid, after discounts and refunds. Taxes and pass-through expenses such as studio rental, travel, hosting, and purchased software are excluded.' },
  { question: 'Do I need a code or an account?', answer: 'No account is needed to make an introduction. A name plus email or phone is enough to help identify you. If you have a referral code, the client can enter that instead. Sam confirms attribution before approving commission.' },
  { question: 'What if the person already knows the studio?', answer: 'Existing clients and active inquiries are not automatically eligible. Check with Sam before claiming a referral; an introduction alone does not guarantee commission.' },
  { question: 'When and how am I paid?', answer: 'After the project is completed and the eligible payment clears. Payment arrangements are confirmed directly with you. Recurring hosting, maintenance, and later projects are not automatically included.' },
  { question: 'Do I need to sell or collect payment?', answer: 'No. Introduce the client and let Sam handle the details. Do not promise discounts, availability, deliverables, or final prices, and do not collect money on the studio\'s behalf.' },
]
