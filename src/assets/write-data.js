registerProcessor('write-data', class WriteProcessor extends AudioWorkletProcessor {
  process (inputs, outputs) {
    // Single input, single channel.
    let input = inputs[0]
    let output = outputs[0]
    output[0].set(input[0])

    window.mp_data = window.mp_data || []
    window.mp_data.push({
      t: currentTime
    })

    // Process only while there are inputs.
    return true
  }
})
