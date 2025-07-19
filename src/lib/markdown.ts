export const renderMarkdown = (text: string): string => {
  return text
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-white mb-3 mt-6">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-white mb-4 mt-6">$1</h2>')
    .replace(/^\*\*(.*?)\*\*/gm, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/^- (.*$)/gm, '<li class="text-gray-300 mb-2">$1</li>')
    .replace(/(?:^- .*$\n?)+/gm, '<ul class="list-disc list-inside space-y-2 mb-4">$&</ul>')
    .replace(/<li class="text-gray-300 mb-2">/g, '<li class="text-gray-300 mb-2 ml-4">')
    .replace(/\n\n/g, '<br><br>');
}; 