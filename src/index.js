let controllerDiv = document.getElementById('controllerDiv')

controllerDiv.innerHTML += `
      <div class="controller-panels" id="controller" style="display:none">

      <div class="panel training-panel">

        <!-- Big buttons. -->
        <div class="panel-row big-buttons">
          <button id="train">
            <img width="66" height="66" src="./img/button.png" />
            <span id="train-status">TRAIN MODEL</span>
          </button>
          <button id="predict">
            <img width="66" height="66" src="./img/button.png" />
            <span>PLAY</span>
          </button>
        </div><!-- /.panel-row -->

        <div class="panel-row params-webcam-row">

          <!-- Hyper params. -->
          <div class="hyper-params">

            <!-- Learning rate -->
            <div class="dropdown">
              <label>Learning rate</label>
              <div class="select">
                <select id="learningRate">
                  <option value="0.00001">0.00001</option>
                  <option selected value="0.0001">0.0001</option>
                  <option value="0.01">0.001</option>
                  <option value="0.03">0.003</option>
                </select>
              </div>
            </div>

            <!-- Batch size -->
            <div class="dropdown">
              <label>Batch size</label>
              <div class="select">
                <select id="batchSizeFraction">
                  <option value="0.05">0.05</option>
                  <option value="0.1">0.1</option>
                  <option selected value="0.4">0.4</option>
                  <option value="1">1</option>
                </select>
              </div>
            </div>

            <!-- Epochs -->
            <div class="dropdown">
              <label>Epochs</label>
              <div class="select">
                <select id="epochs">
                  <option value="10">10</option>
                  <option selected value="20">20</option>
                  <option value="40">40</option>
                </select>
              </div>
            </div>

            <!-- Hidden units -->
            <div class="dropdown">
              <label>Hidden units</label>
              <div class="select">
                <select id="dense-units">
                  <option value="10">10</option>
                  <option selected value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>

          </div><!-- /.hyper-params -->

          <div class="webcam-box-outer">
            <div class="webcam-box-inner">
              <video autoplay playsinline muted id="webcam" width="224" height="224"></video>
            </div>
          </div>

        </div><!-- /.panel-row -->

      </div><!-- /.panel -->

      <div class="panel joystick-panel">

        <div class="panel-row panel-row-top">

          <div class="panel-cell panel-cell-left panel-cell-fill">
            <p class="help-text">
            Click to add the <br/>
            current camera <br/>
            view as an example <br/>
            for that control
            </p>
          </div><!-- ./panel-cell -->

          <div class="panel-cell panel-cell-center">
            <div class="thumb-box">
              <div class="thumb-box-outer">
                <div class="thumb-box-inner">
                  <canvas class="thumb" width=224 height=224 id="up-thumb"></canvas>
                </div>
                <button class="record-button" id="up"/><span>Add Sample</span></button>
              </div>
              <p>
                <span id="up-total">0</span> examples
              </p>
            </div>
          </div><!-- ./panel-cell -->

          <div class="panel-cell panel-cell-right panel-cell-fill">
          </div><!-- ./panel-cell -->

        </div><!-- /.panel-row -->
        <div class="panel-row panel-row-middle">
          <div class="panel-cell panel-cell-left">
            <div class="thumb-box">
              <div class="thumb-box-outer">
                <div class="thumb-box-inner">
                  <canvas class="thumb" width=224 height=224 id="left-thumb"></canvas>
                </div>
                <button class="record-button" id="left"/><span>Add Sample</span></button>
              </div>
              <p>
                <span id="left-total">0</span> examples
              </p>
            </div>
          </div><!-- ./panel-cell -->

          <div class="panel-cell panel-cell-center panel-cell-fill">
            <img height="108" width="auto" src="./img/directions.png" />
          </div><!-- ./panel-cell -->

          <div class="panel-cell panel-cell-right">
            <div class="thumb-box">
              <div class="thumb-box-outer">
                <div class="thumb-box-inner">
                  <canvas class="thumb" width=224 height=224 id="right-thumb"></canvas>
                </div>
                <button class="record-button" id="right"/><span>Add Sample</span></button>
              </div>
              <p>
                <span id="right-total">0</span> examples
              </p>
            </div>
          </div><!-- ./panel-cell -->

        </div><!-- /.panel-row -->

        <div class="panel-row panel-row-bottom">

          <div class="panel-cell panel-cell-left panel-cell-fill">
          </div><!-- ./panel-cell -->

          <div class="panel-cell panel-cell-center">
            <div class="thumb-box">
              <div class="thumb-box-outer">
                <div class="thumb-box-inner">
                  <canvas class="thumb" width=224 height=224 id="down-thumb"></canvas>
                </div>
                <button class="record-button" id="down"/><span>Add Sample</span></button>
              </div>
              <p>
                <span id="down-total">0</span> examples
              </p>
            </div>
          </div><!-- ./panel-cell -->

          <div class="panel-cell panel-cell-right panel-cell-fill">
          </div><!-- ./panel-cell -->

        </div><!-- /.panel-row -->


      </div><!-- /.panel -->

    </div><!-- /#controller -->
    `

TitleScreen.render()
