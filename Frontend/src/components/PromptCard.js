import '../stylesheets/promptcard.css'

function PromptCard({
  name,
  self,
  description
}) {
    return (
        <div className='prompt-card'>
            {name}
        </div>
    );
  }

  export default PromptCard