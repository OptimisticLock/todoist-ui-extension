import { DoistCard, SubmitAction, TextBlock } from '@doist/ui-extensions-core'
import express, { Request, Response, NextFunction } from 'express'

const port = 3000
const app = express()

const processRequest = async function (
    request: Request, response: Response, next: NextFunction
) {
    // Prepare the Adaptive Card with the response
    // (it's going to be a form with some text and a button)
    const card = new DoistCard()
    card.addItem(TextBlock.from({
        text: 'Hello, my friend! 🤩',
    }))
    card.addAction(
        SubmitAction.from({
            id: 'Action.Submit',
            title: 'Click me!',
            style: 'positive',
        }),
    )

    // Send the Adaptive Card to the renderer
    response.status(200).json({card: card})
}

app.post('/process', processRequest)

app.listen(port, () => {
    console.log(`UI Extension server running on port ${port}.`)
});